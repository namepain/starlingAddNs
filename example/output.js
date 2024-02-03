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
