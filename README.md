# rosebush

rosebush 是使用 React Hooks 和 typescript 打造的组件库

[rosebush 的官方地址](https://rosebush.vercel.app/)

### 安装试试

```javascript
npm install rosebush-react --save
```

### 使用

```javascript
// 加载样式
import 'rosebush-react/dist/index.css'
// 引入组件
import { Button } from 'rosebush-react'
```

### 组件库亮点

- 🔥typescript with React Hooks
- 💧组件库组件种类丰富，功能齐全， 样式美观
- ⛑️使用 react-testing-library 完成单元测试
- 📚使用 storybook 本地调试和生成文档页面
- 📚使用 react-doc-gen 自动生成文档
- 📦使用第三方库扩充组件-(react-fontawesome, react-transition-group)
- 🌹样式（Sass）文件从零开始，提供多种主题， 使用大型应用的 CSS 组织方法
- 🎉提供husky提交发布前验证，travis CI/CD 集成等

### 一些本地开发命令

```bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm publish
```
