import h from './html';
import {
  changeOpenedNodeName,
  removeNode,
  nodeNameInput,
  removeNodeButton
} from './nodeToolbarUtils';

export default (data) => ({

  addCompositeChildNode: () => ({
    arrow: 'adding child started'
  }),

  changeOpenedNodeName,

  removeNode: removeNode(data),

  render: ({ctx, thisModel}) => ([

    nodeNameInput({thisModel, ctx}),

    h('input', {
      props: {type: 'button', value: 'add child'},
      on: {click: () => thisModel.addCompositeChildNode()}
    }),

    removeNodeButton({thisModel}),

  ])

});