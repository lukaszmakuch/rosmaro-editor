const h = require('snabbdom/h').default;

export default () => ({
  render: () => h('span', {}, 'Loading...')
});