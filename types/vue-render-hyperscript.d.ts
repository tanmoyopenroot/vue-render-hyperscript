
declare module 'vue-render-hyperscript' {
  import _Vue, { VNode, VueConstructor } from 'vue';

  export default class VueRenderHyperscript {
    static install(Vue: typeof _Vue): void;
  }

  interface ICreateElement {
    (tagName: VueConstructor<_Vue> | string, properties?: Object, ...children: any[]): VNode
  }

  module 'vue/types/options' {
    interface ComponentOptions<V extends _Vue> {
      renderHyperScript?: (createElement: ICreateElement, ctx: RenderContext) => VNode;
    }
  }
}
