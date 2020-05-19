declare module 'vue-render-hyperscript' {
  import Vue, { VNode } from 'vue';
  import {
    IVue,
    ICreateElement,
  } from 'types/common';

  export default class VueRenderHyperscript {
    static install(Vue: IVue): void;
  }

  module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
      renderHyperScript?: (createElement: ICreateElement, ctx: RenderContext) => VNode;
    }
  }
}
