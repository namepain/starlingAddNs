# babel-plugin-addParamsNs

用于给 starling 调用第三个参数加 ns 参数
```
const ddd = i18n.t('gcrm.acct.hi', 'Hi, {man}!');
const aaa = __('gcrm.acct.hi', 'Hi, {man}!', {
  man
});
const bbb = __('gcrm.acct.hi', 'Hi, {man}!');
const ccc = __('gcrm.acct.hi', 'Hi, {man}!', obj);

// 转换为
const ddd = i18n.t('gcrm.acct.hi', 'Hi, {man}!', {
  ns: "abc"
});
const aaa = __('gcrm.acct.hi', 'Hi, {man}!', {
  man,
  ns: "abc"
});
const bbb = __('gcrm.acct.hi', 'Hi, {man}!', {
  ns: "abc"
});
const ccc = __('gcrm.acct.hi', 'Hi, {man}!', {
  ...obj,
  ns: "abc"
});

```

参考：
https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md#toc-pre-and-post-in-plugins

https://babeljs.io/docs/babel-types#objectexpression

https://juejin.cn/post/7165912843315839012

https://juejin.cn/post/6976162793372270629

https://juejin.cn/post/6844904162237366279

https://juejin.cn/post/7032173832878161950

https://astexplorer.net/

