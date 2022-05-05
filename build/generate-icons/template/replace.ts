export const replaceSvgContent = (temp: string, prefix = '') => {
  const setPrefix = (str: string) => `${prefix}${str}`;

  return temp
    .replace(/"_svgSize"/g, setPrefix('{data.size}'))
    .replace(/"_className"/g, setPrefix('{data.className}'))
    .replace(/"_outStrokeColor"/g, setPrefix('{data.colorDesc[0]}'))
    .replace(/"_outFillColor"/g, setPrefix('{data.colorDesc[1]}'))
    .replace(/"_innerStrokeColor"/g, setPrefix('{data.colorDesc[2]}'))
    .replace(/"_innerFillColor"/g, setPrefix('{data.colorDesc[3]}'))
    .replace(/"_strokeWidth"/g, setPrefix('{data.strokeWidth}'))
    .replace(/"_strokeLinecap"/g, setPrefix('{data.strokeLineCap}'))
    .replace(/"_strokeLinejoin"/g, setPrefix('{data.strokeLineJoin}'));
};
