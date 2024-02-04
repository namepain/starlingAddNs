const fs = require('fs');
const path = require('path');

const isI18Call = (callee, t) => {
  if (callee.name === '__') {
    return true;
  }

  if (
    t.isMemberExpression(callee) &&
    t.isIdentifier(callee.object) &&
    callee.object.name === 'i18n' &&
    t.isIdentifier(callee.property) &&
    callee.property.name === 't'
  ) {
    return true;
  }

  return false;
};

const KEY = 'ns';
const VAL = 'abc';

module.exports = function ({ types: t }) {
  const logArr = [];
  return {
    post() {
      // console.log(logArr);
      fs.writeFileSync(path.resolve(__dirname, 'StarlingNs.ts'), logArr.join('\n'), 'utf8');
    },
    visitor: {
      CallExpression(path) {
        const { arguments: args, callee } = path.node;
        // 检查是否为 __ 函数或 i18n.t 函数的调用
        if (isI18Call(callee, t)) {
          if (args.length < 3) {
            // 没有第三个参数，给加上
            args.push(t.objectExpression([t.objectProperty(t.identifier(KEY), t.stringLiteral(VAL))]));
          } else if (args.length > 2 && typeof args[2] === 'object' && args[2].type === 'ObjectExpression') {
            // 第三个参数是对象，给加个属性
            if (!args[2].properties.some(v => t.isIdentifier(v.key) && v.key.name === KEY)) {
              console.log('=============重复重复重复重复重复重复=============');
              args[2].properties.push(t.objectProperty(t.identifier(KEY), t.stringLiteral(VAL)));
            }
          } else if (args.length > 2 && typeof args[2] === 'object' && args[2].type === 'Identifier') {
            // 第三个参数是变量，给扩展运算符
            args[2] = t.objectExpression([
              t.spreadElement(args[2]),
              t.objectProperty(t.identifier(KEY), t.stringLiteral(VAL)),
            ]);
          }

          logArr.push(path.toString());
        }
      },
    },
  };
};
