const h = require('snabbdom/h').default;
import getId from 'uuid/v1';
import {updateCtxBasedOnView, runLayout} from './utils';

export default (data) => ({

  addChildNode: ({ctx}) => {
    const node = {
      group: 'nodes',
      data: {
        id: getId(),
        name: ctx.newChildNodeName,
        link: undefined,
      },
      classes: 'actual-node'
    };
    data.cy.add(node);
    runLayout(data.cy);
    return {
      arrow: 'added',
      ctx: updateCtxBasedOnView({
        ...ctx,
        newChildNodeName: undefined
      }, data.cy)
    };
  },

  typeNewChildNodeName: ({ctx, name}) => {
    return {
      arrow: 'typed',
      ctx: {
        ...ctx,
        newChildNodeName: name
      }
    }
  },

  cancelAddingEntryPoint: ({ctx}) => ({
    arrow: 'canceled',
    ctx: {
      ...ctx,
      newChildNodeName: undefined
    }
  }),

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

        h('input', {
          props: {type: 'button', value: 'cancel'},
          on: {click: e => thisModel.cancelAddingEntryPoint()}
        }),

      ];
  }

});