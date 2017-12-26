const h = require('snabbdom/h').default;
import {getAllNodes, selectedGraphNodeData, updateCtxBasedOnView} from './utils';

export default (data) => ({

  changeSelectedGraphNodeName: ({ctx, newName}) => {
    data.cy.$(`node[id='${ctx.selectedGraphNodeId}']`).data('name', newName);
    return {
      arrow: 'setNewNodeName',
      ctx: updateCtxBasedOnView(ctx, data.cy)
    };
  },

  changeUnderlayingNode: ({ctx, newUnderlayingNodeId}) => {
    data.cy.$(`node[id='${ctx.selectedGraphNodeId}']`).data('link', newUnderlayingNodeId);
    return {
      arrow: 'changedUnderlayingNode',
      ctx: updateCtxBasedOnView(ctx, data.cy)
    };
  },

  deleteSelectedGraphNode: ({ctx}) => {
    data.cy.$(`node[id='${ctx.selectedGraphNodeId}']`).remove();
    data.eh.hide();
    const newCtx = updateCtxBasedOnView(ctx, data.cy);
    return {
      arrow: 'removedGraphNode',
      ctx: newCtx
    };
  },

  render: ({ctx, thisModel}) => {
    const nodeData = selectedGraphNodeData({ctx, data});
    return [

      h('label', {}, [
        'Local node name',
        h('input', {
          props: {type: 'text', value: nodeData.name},
          on: {input: e => thisModel.changeSelectedGraphNodeName({
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
          getAllNodes(ctx).map(({name, id}) => h('option', {
            props: {
              value: id,
              selected: nodeData.link === id
            }
          }, name))
        )
      ]),

      h('input', {
        props: {type: 'button', value: 'Delete local node'},
        on: {click: e => thisModel.deleteSelectedGraphNode()}
      })

    ]
  }

});