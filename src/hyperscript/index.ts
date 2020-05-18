import {
  CreateElement,
  Component,
  AsyncComponent,
  VNodeData,
  VNodeChildren,
} from 'vue';
import parseTag from '@/utils/parse-tag';

type VElement = string
  | Component<any, any, any, any>
  | AsyncComponent<any, any, any, any>
  | (() => Component);

const defaultTag = 'div';

export default (h: CreateElement) => (
  element: VElement = defaultTag,
  ...rest: any[]
) => {
  if (typeof element !== 'string') {
    return h(element, ...rest);
  }

  const [ childrenOrData, ...childrens ] = rest;

  if (
    childrenOrData
    && !childrenOrData.data
    && !Array.isArray(childrenOrData)
    && typeof childrenOrData === 'object'
  ) {
    const {
      tag,
      properties,
    } = parseTag(element, childrenOrData as VNodeData);

    return h(tag || defaultTag, properties, childrens as VNodeChildren);
  } else {
    const {
      tag,
      properties,
    } = parseTag(element);

    return h(tag || defaultTag, properties, rest as VNodeChildren);
  }
};
