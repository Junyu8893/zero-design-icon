import { getAutoGenerateComment } from '../../utils';
import { replaceSvgContent } from './replace';

type TemplateInfo = {
  lineName: string,
  upperName: string,
  svgContent: string,
};

/**
 * 构建 icon vue 组件模板字符
 */
const createVueNextCodeTemplate = (info: TemplateInfo) => {
  const { lineName, upperName, svgContent } = info;

  const _svgContent = replaceSvgContent(svgContent);

  const temp = `
    ${getAutoGenerateComment(`${upperName} Icon`, 'Icons')}

    import { h } from 'vue';
    import { IconBuilder } from '../../icon-builder';
    import { IconSvgRenderData } from '../../_types/common';

    export default IconBuilder('${lineName}', (data: IconSvgRenderData) => (
      ${_svgContent}
    ));
  `;

  return temp;
};

/**
 * 构建 icon svg 组件模版字符串
 */
const creatSvgCodeTemplate = (info: TemplateInfo) => {
  const { lineName, upperName, svgContent } = info;

  const _svgContent = replaceSvgContent(svgContent, '$');

  const temp = `
    ${getAutoGenerateComment(`${upperName} Icon`, 'Icons')}

    import { IconBuilder } from '../../icon-builder';

    export default IconBuilder('${lineName}', (data) => (
      \`${_svgContent}\`
    ));
  `;

  return temp;
};

export const createTemplate = {
  'vue-next': createVueNextCodeTemplate,
  'svg': creatSvgCodeTemplate,
};
