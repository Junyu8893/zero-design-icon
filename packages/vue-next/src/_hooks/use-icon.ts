import { Component, h, InjectionKey, isVNode, Slots, VNode } from 'vue';
import IconComponent, { IconProps } from '../icon';
import type { IconCommonProps } from '../_types/common';

export const IconInjectKey: InjectionKey<IconCommonProps> = Symbol('IconInjectKey');

/**
 * 获取图标 VNode
 * @param slots 插槽
 * @param props 参数
 * @param name 名称，默认：icon
 */
 export const getIconSlot = (slots: Slots, props: Record<string, unknown>, name = 'icon', setIcon = true): VNode | undefined => {
  type IconVnodeType = IconProps['icon'] | undefined;
  const iconSlotRender = slots[name];
  const iconProp = props[name] as IconVnodeType;

  let iconVNode: VNode | undefined = undefined;
  if (iconSlotRender) {
    // Slot
    const iconVNodes = iconSlotRender();
    // Slot 返回的是数组，则取第一个进行渲染
    if (Array.isArray(iconVNodes) && iconVNodes.length) {
      iconVNode = iconVNodes[0];
    }
  } else if (isVNode(iconProp)) {
    // VNode | JSX.Element
    iconVNode = iconProp;
  } else if (typeof iconProp === 'object') {
    // Component
    iconVNode = h(iconProp as Component);
  }

  // VNode 类型
  if (isVNode(iconVNode)) {
    const name = (iconVNode.type as Record<string, string>).name;
    // IconNode 不是 IconComponent，则用 IconComponent 包裹一层
    if (name !== IconComponent.name && setIcon) {
      iconVNode = h(
        IconComponent,
        iconVNode,
      );
    }
  }

  return iconVNode;
};
