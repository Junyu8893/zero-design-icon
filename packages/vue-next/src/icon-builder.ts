/**
 * @file Icon Runtime
 */

import { ComponentOptions, computed, DefineComponent, inject, unref } from 'vue';
import { IconInjectKey } from './_hooks/use-icon';
import { defaultIconConfig, getColorDescription, IconCommonProps, IconSvgRenderData } from './_types/common';
import { createClsName } from './_utils/utils';

export const IconBuilder = (
  name: string,
  render: (data: IconSvgRenderData) => JSX.Element
) => {
  const iconSvgOptions: ComponentOptions<IconCommonProps> = {
    props: ['size', 'type', 'color', 'strokeWidth', 'strokeLineCap', 'strokeLineJoin'],
    setup(props) {
      const iconHook = inject(IconInjectKey);

      const data = computed<IconSvgRenderData>(() => {
        const className = createClsName(`icon-${name}`);

        const colorProp = props.color || iconHook?.color;

        const iconType =
          props.type ||
          iconHook?.type ||
          defaultIconConfig.type;

        const size =
          props.size ||
          iconHook?.size ||
          defaultIconConfig.size;

        const strokeWidth =
          props.strokeWidth ||
          iconHook?.strokeWidth ||
          defaultIconConfig.strokeWidth;

        const strokeLineCap =
          props.strokeLineCap ||
          iconHook?.strokeLineCap ||
          defaultIconConfig.strokeLineCap;

        const strokeLineJoin =
          props.strokeLineJoin ||
          iconHook?.strokeLineJoin ||
          defaultIconConfig.strokeLineJoin;

        const colorDesc = getColorDescription(colorProp, iconType);

        return {
          className,
          size,
          colorDesc,
          strokeWidth,
          strokeLineCap,
          strokeLineJoin,
        };
      });

      return () => {
        return render(unref(data));
      };
    }
  };

  const IconSvg = iconSvgOptions as DefineComponent<IconCommonProps>;

  return IconSvg;
};
