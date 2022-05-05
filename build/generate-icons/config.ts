import path from 'path';
import { OptimizeOptions } from 'svgo';
import tinycolor from 'tinycolor2';
import { XastElement } from './types';

export const renderTypes: ['svg', 'vue-next'] = ['svg', 'vue-next'];
export const renderExtensions = {
  'vue-next': 'tsx',
  'svg': 'ts',
};

/** svg 文件目录地址 */
export const SvgFilePath = path.resolve(__dirname, './svg');
/** packages 目录地址 */
export const PackagesPath = path.resolve(__dirname, '../../packages');

/** 转换的 svg 属性名 */
const colorsProps = [
  'color',
  'fill',
  'stroke',
  'stop-color',
  'flood-color',
  'lighting-color',
];

/** 颜色元组 */
const colorNames = ['_outStrokeColor', '_outFillColor', '_innerStrokeColor', '_innerFillColor'];

/** 转换颜色关系 */
const colorRelations = {
  '#333': 0,
  '#2F88FF': 1,
  '#FFF': 2,
  '#43CCF8': 3,
};

/** 其他属性的转换关系 */
const otherAttrRelation = {
  'stroke-width': '_strokeWidth',
  'stroke-linecap': '_strokeLinecap',
  'stroke-linejoin': '_strokeLinejoin',
};

export const SvgoOptions: OptimizeOptions = {
  // 浮点数精度取 2 位
  floatPrecision: 2,
  plugins: [
    // 删除 XML 处理指令
    'removeXMLProcInst',
    // 删除 svg 标签的 xmlns 属性
    'removeXMLNS',
    // 删除无用的 stroke 和 fill 属性
    'removeUselessStrokeAndFill',
    // 添加 width 和 height，值为 svgSize，方便后续替换成对应的代码
    {
      name: 'addAttributesToSVGElement',
      params: {
        attribute: {
          class: '_className',
          width: '_svgSize',
          height: '_svgSize',
        },
      },
    },
    // 排序属性
    'sortAttrs',

    // 自定义插件处理颜色
    {
      name: 'customCovertAttrs',
      type: 'perItem',
      fn: (node: XastElement) => {
        for (const [name, value] of Object.entries(node.attributes)) {
          // 颜色
          if (colorsProps.includes(name)) {
            for (const [color, num] of Object.entries(colorRelations)) {
              if (tinycolor.equals(value, color)) {
                node.attributes[name] = colorNames[num];
              }
            }
          }

          // 替换其他关键属性
          const otherKeys = Object.keys(otherAttrRelation);
          if (otherKeys.includes(name)) {
            const key = name as unknown as keyof typeof otherAttrRelation;
            node.attributes[name] = otherAttrRelation[key];
          }
        }
      },
    },
  ]
};
