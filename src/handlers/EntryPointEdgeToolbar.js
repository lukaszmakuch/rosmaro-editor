const h = require('snabbdom/h').default;
import {getEdge} from './utils';
import {
  changeSelectedEdgeEntryPoint, 
  deleteSelectedEdge
} from './edgeToolbarUtils';

const updateEdgeDisplayName = edge => {
  const {entryPoint} = edge.data();
  const newDisplayName = ":" + entryPoint;
  edge.data('displayName', newDisplayName);
};

export default (data) => ({

  changeSelectedEdgeEntryPoint: changeSelectedEdgeEntryPoint({data, updateEdgeDisplayName}),

  deleteSelectedEdge: deleteSelectedEdge(data),

  render: ({ctx, thisModel}) => {
    const edge = getEdge({ctx, data});
    const name = edge.data().name;
    const entryPoint = edge.data().entryPoint;

    return [

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