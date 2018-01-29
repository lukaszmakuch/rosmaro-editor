const h = require('snabbdom/h').default;
import {getAllNodes, updateCtxBasedOnView, selectedChildNodeData} from './utils';

const defaultChildName = 'Child node';

export default (data) => ({

  changeSelectedChildNodeName: ({ctx, newName}) => {
    data.cy.$(`node[id='${ctx.selectedChildNodeId}']`)
      .data('name', newName || defaultChildName);
    return {
      arrow: 'typed node name',
      ctx: updateCtxBasedOnView(ctx, data.cy)
    };
  },

  changeUnderlayingNode: ({ctx, newUnderlayingNodeId}) => {
    data.cy.$(`node[id='${ctx.selectedChildNodeId}']`)
      .data('link', newUnderlayingNodeId);
    return {
      arrow: 'changed underlaying node',
      ctx: updateCtxBasedOnView(ctx, data.cy)
    };
  },

  deleteSelectedChildNode: ({ctx}) => {
    const child = data.cy.$(`node[id='${ctx.selectedChildNodeId}']`);
    child.remove();
    data.eh.hide();
    const newCtx = updateCtxBasedOnView(ctx, data.cy);
    return {
      arrow: 'removed child node',
      ctx: newCtx
    };
  },

  render: ({ctx, thisModel}) => {
    const nodeData = selectedChildNodeData({ctx, data});
    return [

      h('label', {}, [
        'Local node name',
        h('input', {
          props: {type: 'text', value: nodeData.name},
          on: {input: e => thisModel.changeSelectedChildNodeName({
            newName: e.target.value
          })}
        })
      ]),

      h('label', {}, [
        'underlaying node',
        h(
          'select', 
          {on: {change: e => thisModel.changeUnderlayingNode({
              newUnderlayingNodeId: e.target.value
          })}},
          [
            h('option', {props: {
              value: undefined,
              selected: !ctx.loadedGraph[nodeData.link]
            }}, 'None'),
            ...getAllNodes(ctx).map(({name, id}) => h('option', {
              props: {
                value: id,
                selected: nodeData.link === id
              }
            }, name))
          ]
        )
      ]),

      h('input', {
        props: {type: 'button', value: 'Delete local node'},
        on: {click: e => thisModel.deleteSelectedChildNode()}
      })

    ]
  }

});