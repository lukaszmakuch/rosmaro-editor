import h from './html';
import {
  changeOpenedNodeName,
  removeNode,
  nodeNameInput,
  removeNodeButton
} from './nodeToolbarUtils';

export default (data) => ({

  changeOpenedNodeName,

  removeNode: removeNode(data),

  addChildNode: () => ({arrow: 'adding child node began'}),

  addEntryPoint: () => ({arrow: 'adding entry point began'}),

  render: ({ctx, thisModel}) => [

    nodeNameInput({thisModel, ctx}),

    h('input', {
      props: {type: 'button', value: 'new node'},
      on: {click: e => thisModel.addChildNode()}
    }),

    h('input', {
      props: {type: 'button', value: 'new entry point'},
      on: {click: e => thisModel.addEntryPoint()}
    }),

    removeNodeButton({thisModel})

  ]

});