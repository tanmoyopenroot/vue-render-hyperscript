# vue-render-hyperscript

Hyperscript syntax for vue.

## Usage

```js
// entry-file
import Vue from 'vue';
import App from './App.vue';
import VueRenderHyperscript from 'vue-render-hyperscript';

Vue.config.productionTip = false;

// Pass plugin
Vue.use(VueRenderHyperscript);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

```js
// HelloWorld.vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: String,
    },
  };
</script>
```

```js
// App.vue
<script>
  import HelloWorld from './HelloWorld.vue';

  export default {
    name: 'App',
    components: {
      HelloWorld,
    },
    renderHyperScript(h) {
      return h('div#page',
        h('div#header',
          h('h1.classy', {
            style: {'background-color': '#22f'},
          }, 'Some Header'),
        ),
        h('div#menu', {
            style: {'background-color': '#2f2'},
          },
          h('ul',
            h('li', 'one'),
            h('li', 'two'),
            h('li', 'three'),
          ),
        ),
        h('h2',  {
          style: {'background-color': '#f22'},
        }, 'some content'),
        h('p',
          "so it's just like a templating engine,\n",
          "but easy to use inline with javascript\n",
        ),
        h('p',
          "the intention is for this to be used to create\n",
          "reusable, interactive html widgets. ",
        ),
        h(HelloWorld, {
            props: {
              msg: "Hello World",
            },
          },
        ),
      );
    },
  };
</script>
```

```html
<!-- Output -->
<div id="page">
  <div id="header">
    <h1 class="classy" style="background-color: rgb(34, 34, 255);">
      Some Header
    </h1>
  </div>
  <div id="menu" style="background-color: rgb(34, 255, 34);">
    <ul>
      <li>one</li>
      <li>two</li>
      <li>three</li>
    </ul>
  </div>
  <h2 style="background-color: rgb(255, 34, 34);">some content</h2>
  <p>
    so it's just like a templating engine, but easy to use inline with
    javascript
  </p>
  <p>
    the intention is for this to be used to create reusable, interactive html
    widgets.
  </p>
  <div class="hello"><h1>Hello World</h1></div>
</div>
```

## Documentation

### `h(componentOrTag, properties, children)`

Returns a React element.

- **componentOrTag** `Object|String` - Can be a Vue component **OR** tag
string with optional css class names/id in the format `h1#some-id.foo.bar`.
If a tag string, it will parse out the tag name and change the `id` and
`className` properties of the `properties` object.
- **properties** `Object` *(optional)* - An object containing the properties
you'd like to set on the element.
- **children** `Array|String` *(optional)* - An array of `h()` children or
a string. This will create child elements or a text node, respectively.
