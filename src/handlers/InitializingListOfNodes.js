const h = require('snabbdom/h').default;

export default () => ({

  render: ({ctx, thisModel}) => [
    h('span.header', {}, 'Model nodes'),
    h('ul.nodes', {}),
    h('button.ctrl-button', {}, 'add')
  ]

});