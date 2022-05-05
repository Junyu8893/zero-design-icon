/* eslint-disable no-console */
import camelcase from 'camelcase';
import chalk from 'chalk';
import glob from 'fast-glob';
import { emptyDirSync, readFileSync, writeFileSync } from 'fs-extra';
import path from 'path';
import { optimize as svgOptimize } from 'svgo';
import { formatCode, getAutoGenerateComment } from '../utils';
import { PackagesPath, renderExtensions, renderTypes, SvgFilePath, SvgoOptions } from './config';
import { createTemplate } from './template/icon-template';

const consoleLine = () => {
  console.info(chalk.green('-----------------------------'));
};

/** 清空 icons 目录 */
const emptyIconsDir = () => {
  renderTypes.forEach((type) => {
    const dir = path.join(PackagesPath, type, 'src/icons');
    emptyDirSync(dir);
  });
};

/**
 * 获取所有 svg 文件地址
 */
const getSvgFiles = (): string[] => {
  return glob.sync('*.svg', { cwd: SvgFilePath, absolute: true });
};

/**
 * 获取 svg 名称信息
 * @param file svg文件地址
 */
const getSvgName = (file: string) => {
  const fileName = path.basename(file).replace('.svg', '');

  return {
    /** 横线格式, foo-bar */
    lineName: fileName,
    /** 小驼峰格式, fooBar */
    lowerName: camelcase(fileName, { locale: 'en-US' }),
    /** 大驼峰格式, FooBar */
    upperName: camelcase(fileName, { pascalCase: true }),
  };
};

/**
 * 使用 svgo 处理 svg 文本
 * @param content svg 文本
 * @param file 文件地址
 */
const formatSvg = (content: string, file: string) => {
  const result = svgOptimize(content, SvgoOptions);
  let str = content;
  if ('data' in result) {
    str = result.data;
  } else {
    console.error(chalk.red(`svgo 格式化 svg 异常，请检查文件是否正确: ${file}`));
  }

  return str;
};

/**
 * 编译 svg，转成组件
 * @param files svg 文件地址列表
 */
const compileSvgs = (files: string[]) => {
  consoleLine();
  files.forEach((file) => svgToComponent(file));
};

/**
 * svg 转组件
 * @param file svg 文件地址
 */
const svgToComponent = (file: string) => {
  // 读取文件内容
  const content = readFileSync(file, 'utf-8');
  // 获取所需的名称格式
  const { lineName, upperName } = getSvgName(file);
  // svgo 处理
  const svgContent = formatSvg(content, file);

  for (let i = 0; i < renderTypes.length; i++) {
    const type = renderTypes[i];

    // 生成代码
    const templateFunc = createTemplate[type];
    const resultCode = templateFunc({
      lineName,
      upperName,
      svgContent,
    });
    // 格式化代码
    const code = formatCode(resultCode);

    // 初始化输出目录
    const iconDir = path.resolve(PackagesPath, `${type}/src/icons/${lineName}`);
    emptyDirSync(iconDir);
    // 输出代码
    writeFileSync(path.resolve(iconDir, `index.${renderExtensions[type]}`), code, 'utf-8');
    console.info(chalk.green(`create ${type} component success: ${lineName}`));
  }
  consoleLine();
};

/**
 * 创建 map.ts 文件
 */
const createMapFile = (files: string[]) => {
  let code = files.map((file) => {
    const { upperName, lineName } = getSvgName(file);
    return `export { default as Icon${upperName} } from './icons/${lineName}';`;
  }).join('\n');

  code = `
${getAutoGenerateComment('All Icon Exporter', 'Icons')}

${code}
  `;

  const fileCode = formatCode(code);
  consoleLine();
  renderTypes.forEach((type) => {
    const mapFilePath = path.resolve(PackagesPath, `${type}/src/map.ts`);
    writeFileSync(mapFilePath, fileCode, 'utf-8');
    console.info(chalk.green(`create ${type} map.ts success`));
  });
  consoleLine();
};

(() => {
  console.info(chalk.blue('初始化 icons 目录'));
  emptyIconsDir();

  console.info(chalk.blue('获取所有 svg 文件'));
  const files = getSvgFiles();

  console.info(chalk.blue('svg 转组件'));
  compileSvgs(files);

  console.info(chalk.blue('构建 map.ts 文件'));
  createMapFile(files);

  console.info(chalk.green('Success'));
})();
