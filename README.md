# simple webpack
一个简单的webpack基本功能实现

# 实现内容
具体的实现共能入口为/lib/index.js

1. ES6转换为ES5代码
- 通过babylon将代码转换成AST；
- 由babel-core把AST转换成ES5源码。

2. 可以分析模块之间的依赖
- 通过babylon将代码转换成AST；
- 通过babel-traverse的ImportDeclaration遍历获取到引入节点，获取引入依赖的路径。

3. 打包输出JS代码并使用
- 创建一个自执行函数，接受所有module集合作为参数；
- 定义自己的require方法，实现对module集合依赖的引入。

# 使用
文件/simplepack.config.js是对simple-webpack的配置设定，加入了entry和output功能。
使用方式：
1. 安装依赖

```
npm install
```

2. 编译
```
npm run build
```

3. 打开/dist/index.html查看最终引入打包JS文件的效果。

