import { CLASS_NAME_PREFIX } from '../_config';

/**
 * 创建 class name
 */
export const createClsName = (name: string): string => {
  return `${CLASS_NAME_PREFIX}-${name}`;
};
