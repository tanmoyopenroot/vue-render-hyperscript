import isFunction from '@/utils/is-function';
import hyperscript from '@/hyperscript';
import {
  IVue,
  IOptions,
} from '../types/common';

export default (Vue: IVue) => {
  Vue.mixin({
    render(h, ctx) {
      const { renderHyperScript } = (this as IOptions).$options;

      if (
        renderHyperScript &&
        isFunction(renderHyperScript)
      ) {
        const hyper = hyperscript(h);

        return renderHyperScript.call(this, hyper, ctx);
      }
    },
  });
};
