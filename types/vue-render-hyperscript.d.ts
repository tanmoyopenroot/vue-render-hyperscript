declare module 'vue-render-hyperscript' {
  import _Vue, {
    VNode,
    Component,
    AsyncComponent,
  } from 'vue';
  export default class VueRenderHyperscript {
    static install(Vue: typeof _Vue): void;
  }

  export type IElement = string
  | Component<any, any, any, any>
  | AsyncComponent<any, any, any, any>
  | (() => Component);

  export type ICreateElement = (element: IElement, ...children: any[]) => VNode;

  module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
      renderHyperScript?: (createElement: ICreateElement, ctx: RenderContext) => VNode;
    }
  }
}
