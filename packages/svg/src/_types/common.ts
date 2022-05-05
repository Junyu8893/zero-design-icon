/** 图标类型 */
export type IconType = 'outline' | 'filled' | 'two-tone' | 'multi-color';

/** 图标线帽类型 */
export type StrokeLineCap = 'round' | 'butt' | 'square';

/** 图标拐角类型 */
export type StrokeLineJoin = 'round' | 'bevel' | 'miter';

/** 图标颜色类型 */
export type IconColor = string | [string, string] | [string, string, string, string];

/** 图标公用类型 */
export type IconCommonProps = {
  size?: number,
  type?: IconType,
  color?: IconColor,
  strokeWidth?: number,
  strokeLineCap?: StrokeLineCap,
  strokeLineJoin?: StrokeLineJoin,
};

/** 颜色描述元组 */
export type ColorDescription = [outStroke: string, outFill: string, innerStroke: string, innerFill: string];

/** icon builder 数据 */
export type IconSvgRenderData = {
  className: string;
  size: number;
  colorDesc: ColorDescription;
  strokeWidth: number;
  strokeLineCap: StrokeLineCap;
  strokeLineJoin: StrokeLineJoin;
};

/** currentColor 字符串 */
export const currentColor = 'currentColor';

/** 默认图标配置 */
export const defaultIconConfig = {
  size: 24,
  type: 'outline' as IconType,
  strokeWidth: 4,
  strokeLineCap: 'round' as StrokeLineCap,
  strokeLineJoin: 'round' as StrokeLineJoin,
  colors: {
    outline: {
      background: 'none',
    },
    filled: {
      background: '#FFF',
    },
    twoTone: {
      stroke: '#333',
      fill: '#2F88FF',
    },
    multiColor: {
      outStroke: '#333',
      outFill: '#2F88FF',
      innerStroke: '#FFF',
      innerFill: '#43CCF8',
    },
  },
};

/**
 * 获取图标颜色描述
 * @param colorProp 颜色配置
 * @param iconType 图标类型
 */
export const getColorDescription = (colorProp: IconColor | undefined, iconType: IconType) => {
  const color: (string | undefined)[] = typeof colorProp === 'string' ? [colorProp] : colorProp || [];
  const colorDesc: ColorDescription = [currentColor, currentColor, currentColor, currentColor];

  switch (iconType) {
    case 'outline': {
      colorDesc[0] = typeof color[0] === 'string' ? color[0] : currentColor;
      colorDesc[1] = 'none';
      colorDesc[2] = typeof color[0] === 'string' ? color[0] : currentColor;
      colorDesc[3] = 'none';
      break;
    }
    case 'filled': {
      const { background } = defaultIconConfig.colors.filled;
      colorDesc[0] = typeof color[0] === 'string' ? color[0] : currentColor;
      colorDesc[1] = typeof color[0] === 'string' ? color[0] : currentColor;
      colorDesc[2] = background;
      colorDesc[3] = background;
      break;
    }
    case 'two-tone': {
      const { stroke, fill } = defaultIconConfig.colors.twoTone;
      colorDesc[0] = typeof color[0] === 'string' ? color[0] : stroke;
      colorDesc[1] = typeof color[1] === 'string' ? color[1] : fill;
      colorDesc[2] = typeof color[0] === 'string' ? color[0] : stroke;
      colorDesc[3] = typeof color[1] === 'string' ? color[1] : fill;
      break;
    }
    case 'multi-color': {
      const { outStroke, outFill, innerStroke, innerFill } = defaultIconConfig.colors.multiColor;
      colorDesc[0] = typeof color[0] === 'string' ? color[0] : outStroke;
      colorDesc[1] = typeof color[1] === 'string' ? color[1] : outFill;
      colorDesc[2] = typeof color[2] === 'string' ? color[2] : innerStroke;
      colorDesc[3] = typeof color[3] === 'string' ? color[3] : innerFill;
      break;
    }
  }
  return colorDesc;
};
