const h = require('snabbdom/h').default;

export default ({ctx}) => {
  return h('div.error', {}, "The code couldn't be loaded.");
};