import _Vue, {
  VNode,
  Component,
  AsyncComponent,
  RenderContext,
} from 'vue';

export type IVue = typeof _Vue;

export type IElement = string
| Component<any, any, any, any>
| AsyncComponent<any, any, any, any>
| (() => Component);

export type ICreateElement = (element: IElement, ...children: any[]) => VNode;

export interface IOptions {
  $options: {
    renderHyperScript: (createElement: ICreateElement, ctx: RenderContext) => any;
  };
}
