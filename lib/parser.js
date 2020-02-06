/** 
 * parser.js
 * 功能：
 * 1. 分析依赖
 * 2. 利用AST使ES6代码转换至ES5
 */

const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

module.exports = {
  getAST: (file) => {
    const source = fs.readFileSync(file, 'utf-8');

    return babylon.parse(source, {
      sourceType: 'module'
    });
  },

  getDependencies: (ast) => {
    let dependencies = [];

    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      }
    });

    return dependencies;
  },

  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['env']
    });

    return code;
  }
}