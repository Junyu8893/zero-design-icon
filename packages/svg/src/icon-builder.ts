/**
 * @file Icon Runtime
 */

import { defaultIconConfig, getColorDescription, IconCommonProps, IconSvgRenderData } from './_types/common';
import { createClsName } from './_utils/utils';

export const IconBuilder = (
  name: string,
  render: (data: IconSvgRenderData) => string
) => {
  return (props: IconCommonProps = {}) => {
    const data = () => {
      const className = createClsName(`icon-${name}`);

      const iconType =
        props.type ||
        defaultIconConfig.type;

      const size =
        props.size ||
        defaultIconConfig.size;

      const strokeWidth =
        props.strokeWidth ||
        defaultIconConfig.strokeWidth;

      const strokeLineCap =
        props.strokeLineCap ||
        defaultIconConfig.strokeLineCap;

      const strokeLineJoin =
        props.strokeLineJoin ||
        defaultIconConfig.strokeLineJoin;

      const colorDesc = getColorDescription(props.color, iconType);

      return {
        className,
        size,
        colorDesc,
        strokeWidth,
        strokeLineCap,
        strokeLineJoin,
      };
    };

    return () => {
      return render(data());
    };
  };
};
