import { VNodeData } from 'vue';
import classSplit from '@/utils/class-split';

export default (
  element: string,
  data?: VNodeData,
) => {
  let elementId = null;
  const tagParts = classSplit(element);
  const classes = data && data.class
    ? [data.class]
    : [];

  for (let i = 1; i < tagParts.length; i += 2) {
    const part = tagParts[i];
    const type = part.charAt(0);

    if (type === '.') {
      classes.push(part.substring(1, part.length));
    } else if (type === '#') {
      elementId = part.substring(1, part.length);
    }
  }

  return {
    tag: /^\.|#/.test(tagParts[1])
      ? null
      : tagParts[1] && tagParts[1].toLowerCase
        ? tagParts[1].toLowerCase()
        : tagParts[1],
    properties: {
      ...data,
      ...(classes.length && { class: classes.join(' ') }),
      attrs: {
        ...(elementId && { id: elementId }),
        ...data?.attrs,
      },
    },
  };
};
