import h from './html';
import {
  typeNewChildNodeName, 
  newChildNodeName, 
  addChildNode,
  cancelAddingChildNode,
  cancelAddingChildNodeButton
} from './childNodeToolbarUtils';

export default (data) => ({

  typeNewChildNodeName,

  cancelAddingChildNode,

  addChildNode: addChildNode({data}),

  render: ({ctx, thisModel}) => ([

    h('label', {}, [
      'new composite child name',
      h('input', {
        props: {type: 'text', value: newChildNodeName({ctx})},
        on: {input: e => thisModel.typeNewChildNodeName({
          name: e.target.value
        })}
      }),
    ]),

    h('input', {
      props: {type: 'button', value: 'add'},
      on: {click: () => thisModel.addChildNode()}
    }),

    cancelAddingChildNodeButton({thisModel}),

  ])

});