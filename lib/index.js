/** 
 * index.js
 * 
 */

const path = require('path');

const config = require(path.join(process.cwd(), 'simplepack.config.js'));

const Compiler = require('./compiler');

new Compiler(config).run();