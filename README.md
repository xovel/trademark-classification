# trademark-classification

中国商标分类

> 免责与版权声明：这是仅仅是一个数据练手项目，数据采集自[中国商标网][zgsbw]官网，仅用于学习参考。

整体项目分为三个阶段，第一个是纯前端静态渲染数据的方式；第二个是后台搭建模拟服务器，使用 API 进行数据的搜索过滤；第三个阶段是支持真实的商标名称查询（数据来源为[中国商标网](zgsbw)）。

## 技术栈

- `es6`
- `vue`
- `element-ui`
- `fetch`
- `node`
- `express`

[zgsbw]: http://sbj.saic.gov.cn/

- 为什么用 `vue` 和 `element-ui`？
> 深入了解一下 `element-ui` 的组件细节。

## 第一阶段

[在线预览](http://htmlpreview.github.io/?https://github.com/xovel/trademark-classification/blob/master/index-v1.html)

- Q：为什么不引入指定的 `element-ui` 的组件？
> 追求效率，不想动用 `node_modules` 的资源。可以看到本项目在第一阶段的时候都不打算引入 `package.json`。

## 第二阶段

采用 `express` 模拟本地服务器进行数据的获取，大幅度提升了数据的响应速度。实测响应速度在 `300ms` 之内，远超出第一阶段的搜索速度。

### 运行方式

在项目的目录下打开命令行窗口之后：

1. `npm install express`，安装 `express` 模块。
2. `npm run dev`，执行 `npm scripts` 中的开发命令；或者直接执行 `node ./server/app.js`。
3. 使用浏览器访问 `http://localhost:3000/` 即可。

## 第三阶段

第三个阶段暂时不会进行处理，主要是考虑到了拦截请求的高难度，与练习代码基本技巧的理念相悖。原计划是打算引入 `headless` 模式进行数据的抓取，但其难度已经远远超出练手的级别了。

## 知识点整理

- `node` 批量创建文件。
- `node` 读取文件并按照一定规律重新生成文件。
- `vue` 的自定义渲染方法。
- `vue` 组件侦听回车事件 `@keydown.native.enter`。
- `fetch` API 的简单应用

****************

> 特别说明：
> - JS 代码为 ES5 和 ES6 混编。由于未转译成 ES5，运行时请确保浏览器的版本支持简单的 ES6 语法。
> - 项目仅作练习，故此大量中间代码保留了下来。摘抄自 `element-ui` 官网的部分源代码未进行处理。
> - 目前实现第一个阶段的纯静态渲染数据的方式，删除了数据的实时过滤，实测为商标数据量过大，前端检索效率不够理想。
> - 由于数据量过大，`el-tree` 节点过滤方法 `filter-node-method` 异常耗时，这里采取了使用手动按钮触发进行搜索过滤操作。

## TODO

- [ ] 分类查找
- [ ] 编号查找

***************
