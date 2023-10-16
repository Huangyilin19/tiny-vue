<!--anchor:on-->

## 安装

`TinyVue` 组件库同时支持 `Vue 2.0` 和 `Vue 3.0` 框架，统一依赖包为`@opentiny/vue`,请根据下表安装不同的版本以适配您的项目：

| 项目 Vue 版本 | 组件库版本        |
| ------------- | ----------------- |
| Vue2.x        | @opentiny/vue@2.x |
| Vue3.x        | @opentiny/vue@3.x |

`TinyVue` 暂时不支持 `Vue2.7`, 当项目使用`Vue2.0`框架时，推荐版本写法：`"vue": "~2.6.14" , "vue-template-compiler": "~2.6.14"` 。

### 全新项目配置

在项目的根目录中，打开控制台，执行以下命令，为 `Vue 3.0` 的项目安装 `TinyVue` 组件库 ：

```bash
yarn add @opentiny/vue@3
# 或者
npm install @opentiny/vue@3
```

或者执行以下命令，为 `Vue 2.0` 的项目安装 `TinyVue` 组件库 ：

```bash
yarn add @opentiny/vue@2
# 或者
npm install @opentiny/vue@2
```

如果是`Vite` 工程，安装完依赖后，修改项目的 `vite.config.js` ，添加以下代码突出显示的部分：

```js {8-10}
// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': { ...process.env }
  }
})
```

### 通过 CDN 方式引入

为了更快地体验 TinyVue 的组件，你也可以通过 CDN 方式直接在 HTML 页面中引入 TinyVue。

```html
<head>
  <!-- 引入 vue 和 @opentiny/vue -->
  <script type="importmap">
    {
      "imports": {
        "vue": "https://unpkg.com/vue@3.2.45/dist/vue.esm-browser.js",
        "@opentiny/vue": "https://unpkg.com/@opentiny/vue@3.9.1/runtime/tiny-vue.mjs",
        "@opentiny/vue-common": "https://unpkg.com/@opentiny/vue@3.9.1/runtime/tiny-vue-common.mjs",
        "@opentiny/vue-icon": "https://unpkg.com/@opentiny/vue@3.9.1/runtime/tiny-vue-icon.mjs",
        "@opentiny/vue-locale": "https://unpkg.com/@opentiny/vue@3.9.1/runtime/tiny-vue-locale.mjs"
      }
    }
  </script>
  <!-- 引入 @opentiny/vue 样式 -->
  <link rel="stylesheet" href="https://unpkg.com/@opentiny/vue-theme/index.css" />
</head>
```

接着就可以导入 TinyVue，并通过 app 实例的 use 方法在全局注册 TinyVue 插件，这样就可以在 template 模板中使用 TinyVue 的组件。

```html
<body>
  <div id="app"></div>
  <script type="module">
    import { createApp } from 'vue'
    // 引入 @opentiny/vue 组件
    import TinyVue from '@opentiny/vue'

    createApp({
      template: `
        <tiny-button>TinyVue</tiny-button>
        <tiny-alert description="TinyVue"></tiny-alert>
      `
    })
      // 注册 @opentiny/vue 组件
      .use(TinyVue)
      .mount('#app')
  </script>
</body>
```

### 常见问题和解决方法：

问题一：`v-model cannot be used on a prop, because local prop bindings are not writable.`

如果启动项目，页面报以下错误：

```shell
[plugin:vite:vue] v-model cannot be used on a prop, because local prop bindings are not writable.

Use a v-bind binding combined with a v-on listener that emits update:x event instead.

/your-project/src/components/tab.vue:2:23
1  |  <template>
2  |    <tiny-tabs v-model="tmpactiveName" stretch tab-style="card" @click="handleClick">
   |                         ^
3  |      <tiny-tab-item v-for="item in editabletabdata" :key="item.id" :title="item.title" :name="item.name">
4  |        <slot name="tablecontent"></slot>
...
```

您可以通过将`v-model`拆分成`modelValue`和`update:modelValue`解决：

```html
<template>
  <tiny-tabs :modelValue="activeName" @update:modelValue="update">
</template>
<script setup lang="ts">
export default {
  props: {
    activeName: String
  },
  methods: {
    update() {
      this.$emit('update:modelValue', this.activeName)
    }
  }
}
</script>
```

问题二：`At least one <template> or <script> is required in a single file component.`

如果页面报以下错误：

```shell
At least one <template> or <script> is required in a single file component.
/your-project/src/views/config/Patch.vue
```

出现该问题的原因是您的项目中存在空文件，可通过删除空文件或者在空文件中加上空的`<template></template>`解决。

如果您在项目升级中遇到其他困难，可以到 github 上新建 issue 反馈（`https://github.com/opentiny/tiny-vue/issues`）