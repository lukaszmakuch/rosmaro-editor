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

  render: ({ctx, thisModel}) => ([
    nodeNameInput({thisModel, ctx}),
    removeNodeButton({thisModel})
  ])

});