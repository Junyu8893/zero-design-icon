import { Component, ComponentOptions, computed, DefineComponent, h, provide, VNodeChild } from 'vue';
import { getIconSlot, IconInjectKey } from './_hooks/use-icon';
import { IconCommonProps } from './_types/common';
import { createClsName, createCompName } from './_utils/utils';

export type IconProps = IconCommonProps & {
  tag?: string,
  icon?: VNodeChild | JSX.Element | Component,
};

const defualtIconTag = 'span';

const iconOptions: ComponentOptions<IconProps> = {
  name: createCompName('Icon'),
  props: ['size', 'type', 'color', 'strokeWidth', 'strokeLineCap', 'strokeLineJoin', 'tag', 'icon'],
  setup(props, { slots }) {
    provide(IconInjectKey, props);

    const styles = computed(() => {
      const style: Record<string, unknown> = {};

      if (props.size) {
        style.fontSize = `${props.size}px`;
      }

      return style;
    });

    return () => {
      const iconAttrs = {
        class: createClsName('icon'),
        style: styles.value,
      };
      const children = slots.default && slots.default();
      const icon = getIconSlot(slots, props, 'icon', false);

      return h(
        props.tag || defualtIconTag,
        iconAttrs,
        children || icon,
      );
    };
  },
};

export default iconOptions as DefineComponent<IconProps>;

