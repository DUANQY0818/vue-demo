import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = { template: '<div>home</div>' };
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [{ path: '/', component: Home }],
});

const vueInstance = new Vue({
  router,
  data: () => ({ n: 0 }),
  template: `
    <div id="app">
      <h1>Basic</h1>
      <ul>
      <li><router-link to="/foo">/foo</router-link></li>
      <li><router-link to="/bar">/bar</router-link></li>
      <li><router-link to="/baz">/baz</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `,

  methods: {},
}).$mount('#app');

document.getElementById('unmount').addEventListener('click', () => {
  vueInstance.$destroy();
  vueInstance.$el.innerHTML = '';
});
