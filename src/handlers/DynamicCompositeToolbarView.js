import h from './html';
import {
  changeOpenedNodeName,
  removeNode,
  nodeNameInput,
  removeNodeButton,
  underlayingNodeInput
} from './nodeToolbarUtils';
import {
  updateCtxBasedOnView, 
} from './utils';

export default (data) => ({

  changeOpenedNodeName,

  removeNode: removeNode(data),

  changeUnderlayingNode: ({ctx, newUnderlayingNodeId}) => {
    const newCtx = {
      ...ctx,
      loadedGraph: {
        ...ctx.loadedGraph,
        [ctx.openedNode]: {
          ...ctx.loadedGraph[ctx.openedNode],
          link: newUnderlayingNodeId
        }
      }
    };

    return {
      arrow: 'changed underlaying node',
      ctx: newCtx
    };
  },

  render: ({ctx, thisModel}) => ([
    nodeNameInput({thisModel, ctx}),
    underlayingNodeInput({
      ctx, 
      thisModel,
      selectedNodeData: ctx.loadedGraph[ctx.openedNode],
      label: 'node template'
    }),
    removeNodeButton({thisModel})
  ])

});


