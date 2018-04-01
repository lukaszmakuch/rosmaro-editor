import h from './html';

export default () => ({

  render: ({ctx, thisModel}) => [
    h('span.header', {}, 'Model nodes'),
    h('ul.nodes', {}),
    h('button.ctrl-button', {}, 'add')
  ]

});