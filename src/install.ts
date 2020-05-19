import _Vue, { RenderContext } from 'vue';
import isFunction from '@/utils/is-function';
import hyperscript from '@/hyperscript';
import {
  IVue,
  ICreateElement,
} from '../types/common';
interface IOptions {
  $options: {
    renderHyperScript: (createElement: ICreateElement, ctx: RenderContext) => any;
  };
}

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
