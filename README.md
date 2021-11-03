--
# 项目名称

```markdown
## desc

## member：
  forget_forever
  aeipyuan

## 项目地址 / 技术栈

项目地址: -
技术栈: React 17.0.0 + Ts 4.4.4 + Redux + taro3.1 + TaroUI 3.0.0-alpha.3
坑点:
- 小程序的webgl功能不太完善，所以首页使用了h5，所以说项目起来的时候需要让h5，小程序一起开起来

## 目录结构
```sh
 
``` 
## 关键技术点

首页使用threeJS做的webgl动画

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

##  attention

- redux中的类型已经写好，放在GlobalState中，需要往redux中存数据的时候先写好类型
- 取redux中的数据的时候使用useData的自定义hook，类型已写好，需要写的时候使用store中暴露出的setState即可
- 首页是一个h5，动画的计算量大，在开发的时候如果感觉卡顿，可以注掉 <Star /> 进行开发
- 路由需要在app.config.ts中添加page，然后在src/router/routerMap.ts中添加路由跳转页
- 全局的路由都使用src/router/index.ts中的navigate进行跳转，按照函数的类型提示使用即可
- 所有的页面都需要包裹在 <PageContainer /> 组件中，内部封装了自定义的NavigeteBar，根据类型提示使用即可
- Modal的弹出框都是使用actions.modalOption方法，根据类型提示即可
- 所有的请求方法都放在src/serves中，类型写在src/serves/types中，放在IRequest的命名空间下
- 缓存使用src/utils/utils中的setLocalStorage和getLocalStorage方法，需要在IStorage中加类型，达到最好的开发体验
- scss文件需要.module.scss结尾，很杠下划线形式的命名都会被转为小驼峰形式（例如 .container-item会被编译成containerItem）
- 推荐写在CSS Module插件，style就可以有智能提示了
- 所有的接口返回的参数是大驼峰的，所以说request函数中做了一个大驼峰变小驼峰的处理，request请求的时候参数也会自动转大驼峰，但是可以通过paramsToBigCamel参数控制要不要转
- 再次强调，所有的页面都必须使用<PageContainer />包着，里面定义了安全高度，想要全屏高直接height: 100%即可，100vh会把NavigateBar页加进去
- utls/hooks里面有一些定义hooks，防抖节流的都有

## API

API 文档:

## Todo

## vscode插件推荐
CSS Modules
Eslint
Git History

## 其他软件
微信开发者工具

```
---
