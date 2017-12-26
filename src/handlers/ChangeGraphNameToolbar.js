const h = require('snabbdom/h').default;

const openedNodeName = ctx => 
  (ctx.loadedGraph[ctx.openedNode] || {}).name || ""

export default () => ({

  changeOpenedNodeName: ({ctx, newName}) => {
    const newCtx = {
      ...ctx,
      loadedGraph: {
        ...ctx.loadedGraph,
        [ctx.openedNode]: {
          ...ctx.loadedGraph[ctx.openedNode],
          name: newName
        }
      }
    };
    return {ctx: newCtx, arrow: 'changedNodeName'};
  },

  render: ({ctx, thisModel}) => [

    h('input', {
      props: {type: 'text', value: openedNodeName(ctx)},
      on: {input: e => thisModel.changeOpenedNodeName({
        newName: e.target.value
      })}
    }),

    h('input', {
      props: {type: 'button', value: 'new node'},
      on: {click: e => thisModel.addChildNode()}
    }),

    h('input', {
      props: {type: 'button', value: 'new entry point'},
      on: {click: e => thisModel.addEntryPoint()}
    }),


  ]

});