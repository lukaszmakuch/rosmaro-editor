const h = require('snabbdom/h').default;
import getId from 'uuid/v1';
import {updateCtxBasedOnView, runLayout} from './utils';
import {
  typeNewChildNodeName, 
  addChildNode,
  cancelAddingChildNode,
  cancelAddingChildNodeButton
} from './childNodeToolbarUtils';

export default (data) => ({

  addChildNode: addChildNode({data}),

  typeNewChildNodeName,

  cancelAddingChildNode,

  render: ({ctx, thisModel}) => {
      const newChildNodeName = ctx.newChildNodeName || '';

      return [

        h('input', {
          props: {type: 'text', value: newChildNodeName},
          on: {input: e => thisModel.typeNewChildNodeName({
            name: e.target.value
          })}
        }),

        h('input', {
          props: {
            type: 'button', 
            value: 'add',
          },
          attrs: {
            disabled: !newChildNodeName
          },
          on: {click: e => thisModel.addChildNode()}
        }),

        cancelAddingChildNodeButton({thisModel}),

      ];
  }

});