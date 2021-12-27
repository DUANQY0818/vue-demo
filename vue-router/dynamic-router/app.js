import Vue from 'vue';
import VueRouter from 'vue-router';

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter);

// 2. Define route components
const User = {
  // 一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用
  template: '<div>User - {{ $route.params.id }}</div>',
  mounted() {},
  // beforeRouteUpdate(to, from, next) {
  //   // react to route changes...
  //   // don't forget to call next()
  //   console.log(to, from);
  // },
  watch: {
    '$route.params': {
      handler: function(val, oldVal) {
        console.log('$route.params', val, oldVal);
      },
      immediate: true,
    },
    // '$route': {
    //   handler: function(val, oldVal) {
    //     console.log('$route', val, oldVal);
    //   },
    //   immediate: true,
    // },
    // 响应路由参数的变化
    '$route'(to, from) {
      console.log('响应路由参数的变化', to, from);
    },
  },
};

const Foo = {
  // 一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用
  template: '<div>Foo - {{ $route.params.id }}</div>',

  watch: {
    '$route.params': {
      handler: function(val, oldVal) {
        console.log('$route.params', val, oldVal);
      },
      immediate: true,
    },
    '$route': {
      handler: function(val, oldVal) {
        console.log('$route', val, oldVal);
      },
      immediate: true,
    },
    // 响应路由参数的变化
    // '$route'(to, from) {
    //   console.log('响应路由参数的变化', to, from);
    // },
  },
};

// 3. Create the router
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    // 动态路径参数 以冒号开头
    /**
     * 你可以在一个路由中设置多段“路径参数”，对应的值都会设置到 $route.params 中。例如：
     * 模式	                                匹配路径	                  $route.params
     * /user/:username	                    /user/evan	               { username: 'evan' }
     * /user/:username/post/:post_id	      /user/evan/post/123	        { username: 'evan', post_id: '123' }
     */
    { path: '/user/:id', component: User },
    { path: '/foo', component: Foo },
  ],
});

// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.
const vueInstance = new Vue({
  router,
  data: () => ({ n: 0 }),
  template: `
    <div id="app">
      <h1>Basic</h1>
      <ul>
        <li><router-link to="/user/foo">/user/foo</router-link></li>
        <li><router-link to="/user/bar">/user/bar</router-link></li>
        <li><router-link to="/foo?delay=200">/foo (delay of 500ms)</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `,

  methods: {
    navigateAndIncrement() {
      const increment = () => this.n++;
      if (this.$route.path === '/') {
        this.$router.push('/foo', increment);
      } else {
        this.$router.push('/', increment);
      }
    },
  },
}).$mount('#app');

document.getElementById('unmount').addEventListener('click', () => {
  vueInstance.$destroy();
  vueInstance.$el.innerHTML = '';
});
