/** 
 * index.js
 * simple webpack的入口文件
 * 根据配置文件执行compiler
 */

const path = require('path');
const config = require(path.join(process.cwd(), 'simplepack.config.js'));
const Compiler = require('./compiler');

new Compiler(config).run();