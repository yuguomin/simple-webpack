/** 
 * compiler.js
 * 功能：执行模块构建和输出
 */

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { getAST, getDependencies, transform } = require('./parser');

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run() {
    const map = {};
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    for (const _module of this.modules) {
      _module.dependencies.map((dependency) => {
        const md5 = crypto.createHash('md5');
        const key = md5.update(dependency).digest('hex');
        if (!map[key]) {
          map[key] = dependency;
          this.modules.push(this.buildModule(dependency));
        }
      });
    }
    this.emitFiles();
  }

  buildModule(fileName, isEntry) {
    let ast;

    if (isEntry) {
      ast = getAST(fileName);
    } else {
      // ast
      const absoluteFileName = path.join(process.cwd(), './src', fileName);
      ast = getAST(absoluteFileName);
    }
    return {
      fileName,
      dependencies: getDependencies(ast),
      transformCode: transform(ast)
    };
  }

  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename);
    let source = '';
    this.modules.map((_module) => {
      source += `'${_module.fileName}': function(require, module, exports) { ${_module.transformCode} },`
    });

    const bundle = `
      (function(modules) {
        function require(fileName) {
          const fn = modules[fileName];

          const module = { exports : {} };

          fn(require, module, module.exports);

          return module.exports;
        }

        require('${this.entry}');
      })({${source}});
    `;

    fs.writeFileSync(outputPath, bundle, 'utf-8');
  }
}