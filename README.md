---
# 项目名称暂未确定

```markdown
## 项目简介

简介：
成员：
  forget_forever
  aeipyuan

## 项目地址 / 技术栈

项目地址: -
技术栈: React + Ts + Redux + taro3.X
坑点:

- 小程序的webgl功能不太完善，所以首页使用了h5，所以说项目起来的时候需要让h5，小程序一起开起来

## 目录结构
```sh
  ├─.eslintignore
  ├─.eslintrc.js
  ├─.prettierignore
  ├─.prettierrc.js
  ├─.stylelintrc.js
  ├─README.md
  ├─build.sh
  ├─jest.config.js
  ├─jsconfig.json
  ├─package.json
  ├─tsconfig.json
  ├─upload.sh
  ├─yarn.lock
  ├─tests
  ├─src
  ├─mock
  ├─config
``` 
## 关键技术点

在公共组件GetFields
目录：
```sh
  ├─src
    ├─components
      ├─
```

## 环境安装

安装 `node_modules`:

```bash
yarn/yarn install
```

## 执行项目

```bash
npm run dev:h5、npm run dev:weapp
```

### 打包

```bash
npm build dev:h5、npm build dev:weapp
```

## Done

- redux中的类型已经写好，放在GlobalState中，需要往redux中存数据的时候先写好类型
- 取redux中的数据的时候使用useData的自定义hook，类型已写好，需要写的时候使用store中暴露出的setState即可
- 首页是一个h5，动画的计算量大，在开发的时候如果感觉卡顿，可以注掉<Star />进行开发
- 路由需要在app.config.ts中添加page，然后在src/router/routerMap.ts中添加路由跳转页
- 全局的路由都使用src/router/index.ts中的navigate进行跳转，按照函数的类型提示使用即可
- 所有的页面都需要包裹在<PageContainer />组件中，内部封装了自定义的NavigeteBar，根据类型提示使用即可
- Modal的弹出框都是使用actions.modalOption方法，根据类型提示即可
- 所有的请求方法都放在src/serves中，类型写在src/types中，放在IRequest的命名空间下
- 缓存使用src/utils/utils中的setLocalStorage和getLocalStorage方法，需要在IStorage中加类型，达到最好的开发体验


## API

API 文档: 

## Todo

## vscode插件推荐
CSS Modules
Eslint
Git History

```
---
