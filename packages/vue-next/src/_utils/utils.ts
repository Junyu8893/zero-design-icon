import { CLASS_NAME_PREFIX, COMPONENT_PREFIX_NAME } from '../_config';

/**
 * 创建组件名
 * @param name 组件名后缀
 */
export const createCompName = (name: string): string => {
  return `${COMPONENT_PREFIX_NAME}${name}`;
};

/**
 * 创建 class name
 */
export const createClsName = (name: string): string => {
  return `${CLASS_NAME_PREFIX}-${name}`;
};
