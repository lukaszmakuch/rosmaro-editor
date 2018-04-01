import h from './html';
import {updateCtxBasedOnView, getEdge} from './utils';
import {
  changeSelectedEdgeEntryPoint, 
  deleteSelectedEdge
} from './edgeToolbarUtils';

const updateEdgeDisplayName = edge => {
  const {name, entryPoint} = edge.data();
  const newDisplayName = name + " : " + entryPoint;
  edge.data('displayName', newDisplayName);
};

export default (data) => ({

  changeSelectedEdgeName: ({ctx, newEdgeName}) => {
    const edge = getEdge({ctx, data});
    edge.data('name', newEdgeName);
    updateEdgeDisplayName(edge);
    return {
      arrow: 'changed edge name',
      ctx: updateCtxBasedOnView(ctx, data.cy)
    };
  },

  changeSelectedEdgeEntryPoint: changeSelectedEdgeEntryPoint({data, updateEdgeDisplayName}),

  deleteSelectedEdge: deleteSelectedEdge(data),

  render: ({ctx, thisModel}) => {
    const edge = getEdge({ctx, data});
    const name = edge.data().name;
    const entryPoint = edge.data().entryPoint;

    return [

      h('label', {}, [
        'edge name',
        h('input', {
          props: {type: 'text', value: name},
          on: {input: e => thisModel.changeSelectedEdgeName({
            newEdgeName: e.target.value
          })}
        })
      ]),

      h('label', {}, [
        'entry point',
        h('input', {
          props: {type: 'text', value: entryPoint},
          on: {input: e => thisModel.changeSelectedEdgeEntryPoint({
            newEntryPoint: e.target.value
          })}
        })
      ]),

      h('input', {
        props: {type: 'button', value: 'Delete edge'},
        on: {click: e => thisModel.deleteSelectedEdge()}
      })

    ]
  }

});