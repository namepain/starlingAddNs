const isI18Call = (callee, t) => {
  if (callee.name === '__') {
    return true;
  }

  if (
    t.isMemberExpression(callee) 
        && t.isIdentifier(callee.object) 
        && callee.object.name === 'i18n' 
        && t.isIdentifier(callee.property) 
        && callee.property.name === 't'
  ) {
    return true;
  }

  return false;
}

const logArr = [];

module.exports = function ({ types: t }) {
  return {
    visitor: {
      CallExpression(path) {
        const { arguments: args, callee } = path.node;
         // 检查是否为 __ 函数或 i18n.t 函数的调用
         if (isI18Call(callee, t)) {
          logArr.push(path.toString())

          if (args.length < 3) {
            args.push(
              t.objectExpression([
                t.objectProperty(t.identifier('ns'),
                t.stringLiteral('abc'))
              ])
            );
          } else if (args.length > 2 && typeof args[2] === 'object' && args[2].
          type === 'ObjectExpression') {
            args[2].properties.push(
              t.objectProperty(t.identifier('ns'), t.stringLiteral('abc'))
            );
          } else if (args.length > 2 && typeof args[2] === 'object' && args[2].type === 'Identifier') {
            args[2] = t.objectExpression([
              t.spreadElement(args[2]),
              t.objectProperty(t.identifier('ns'), t.stringLiteral('abc')),
            ])
          }
        }
      }
    }
  }
};
