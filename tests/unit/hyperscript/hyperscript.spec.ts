import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import VueRenderHyperscript from '@/index';

const localVue = createLocalVue();
localVue.use(VueRenderHyperscript);

describe('Hyperscript', () => {
  it('render with simple tag', () => {
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
        return h('h1');
      },
    }, {
      localVue,
    });

    expect(wrapper.html()).toBe('<h1></h1>');
  });

  it('render with nested', () => {
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
          return h('div',
          h('h1', 'Title'),
          h('p', 'Paragraph'),
        );
      },
    }, {
      localVue,
    });

    expect(wrapper.html()).toBe('<div>\n  <h1>Title</h1>\n  <p>Paragraph</p>\n</div>');
  });

  it('render with arrays for nesting', () => {
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
        return h('div',
          [
            h('h1', 'Title'),
            h('p', 'Paragraph'),
          ],
        );
      },
    }, {
      localVue,
    });

    expect(wrapper.html()).toBe(`<div>\n  <h1>Title</h1>\n  <p>Paragraph</p>\n</div>`);
  });

  it('render with id selector', () => {
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
        return h('div#frame');
      },
    }, {
      localVue,
    });

    expect(wrapper.html()).toBe('<div id="frame"></div>');
  });

  it('render with css selector', () => {
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
        return h('div.panel');
      },
    }, {
      localVue,
    });

    expect(wrapper.html()).toBe('<div class="panel"></div>');
  });

  it('render with default element types', () => {
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
        return h('.panel');
      },
    }, {
      localVue,
    });

    expect(wrapper.html()).toBe('<div class="panel"></div>');
  });

  it('render with properties', () => {
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
        return h('input', {
          attrs: {
            name: 'yes',
            type: 'checkbox',
          },
        });
      },
    }, {
      localVue,
    });

    expect(wrapper.html()).toBe('<input name="yes" type="checkbox">');
  });

  it('render with event handlers', () => {
    const handleOnClick = jest.fn();
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
        return h('button',
          {
            on: {
              click: handleOnClick,
            },
          },
          'Click Me!',
        );
      },
    }, {
      localVue,
    });

    wrapper.vm.$on('onClick', handleOnClick);
    wrapper.trigger('click');

    expect(handleOnClick.mock.calls).toHaveLength(1);
  });

  it('render with styles', () => {
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
        return h('div', {
          style: { color: 'red' },
        });
      },
    }, {
      localVue,
    });

    expect(wrapper.attributes('style')).toBe('color: red;');
  });

  it('render with data attributes', () => {
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
        return h('div', {
          attrs: {
            'data-value': 5,
          },
        });
      },
    }, {
      localVue,
    });

    expect(wrapper.attributes('data-value')).toBe('5');
  });

  it('render with reactive content', () => {
    const wrapper = shallowMount({
      name: 'App',
      data() {
        return {
          title: 'Welcome to HyperScript!',
        };
      },
      renderHyperScript(h) {
        return h('h1', (this as any).title);
      },
    }, {
      localVue,
    });

    expect(wrapper.html()).toBe('<h1>Welcome to HyperScript!</h1>');

    wrapper.vm.$data.title = 'Changed Welcome to HyperScript!';

    wrapper.vm.$nextTick(() => {
      expect(wrapper.html()).toBe('<h1>Changed Welcome to HyperScript!</h1>');
    });
  });

  it('render with reactive property', () => {
    const wrapper = shallowMount({
      name: 'App',
      data() {
        return {
          checked: true,
        };
      },
      renderHyperScript(h) {
        return h('input', {
          attrs: {
            type: 'checkbox',
            checked: (this as any).checked,
          },
        });
      },
    }, {
      localVue,
    });

    expect(wrapper.attributes('checked')).toBe('checked');

    wrapper.vm.$data.checked = false;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.attributes('checked')).toBe(undefined);

      wrapper.vm.$data.checked = true;

      wrapper.vm.$nextTick(() => {
        expect(wrapper.attributes('checked')).toBe('checked');
      });
    });
  });

  it('render with reactive style', () => {
    const wrapper = shallowMount({
      name: 'App',
      data() {
        return {
          color: 'red',
        };
      },
      renderHyperScript(h) {
        return h('div', {
          style: { color: (this as any).color },
        });
      },
    }, {
      localVue,
    });

    expect(wrapper.attributes('style')).toBe('color: red;');

    wrapper.vm.$data.color = 'blue';

    wrapper.vm.$nextTick(() => {
      expect(wrapper.attributes('style')).toBe('color: blue;');
    });
  });

  it('render with unicode selectors(without tag)', () => {
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
        return h('.⛄');
      },
    }, {
      localVue,
    });

    expect(wrapper.html()).toBe('<div class="⛄"></div>');
  });

  it('render with unicode selectors(with tag)', () => {
    const wrapper = shallowMount({
      name: 'App',
      renderHyperScript(h) {
        return h('span#⛄');
      },
    }, {
      localVue,
    });

    expect(wrapper.html()).toBe('<span id="⛄"></span>');
  });
});
