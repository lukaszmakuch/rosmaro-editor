const h = require('snabbdom/h').default;
import {
  changeOpenedNodeName,
  removeNode,
  nodeNameInput,
  removeNodeButton
} from './nodeToolbarUtils';

export default (data) => ({

  changeOpenedNodeName,

  removeNode: removeNode(data),

  addChildNode: () => ({arrow: 'addingChildNodeBegan'}),

  addEntryPoint: () => ({arrow: 'addingEntryPointBegan'}),

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