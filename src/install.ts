import _Vue from 'vue';
import isFunction from '@/utils/is-function';
import hyperscript from '@/hyperscript';

type IVue = typeof _Vue;

export default (Vue: any) => {
  Vue.mixin({
    render(h: any, ctx: any) {
      const { renderHyperScript } = this.$options;
      const hyper = hyperscript(h);

      if (
        renderHyperScript &&
        isFunction(renderHyperScript)
      ) {
        return renderHyperScript.call(this, hyper, ctx);
      }
    },
  });
};
