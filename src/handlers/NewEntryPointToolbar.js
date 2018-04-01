import h from './html';
import getId from 'uuid/v1';
import {updateCtxBasedOnView, runLayout} from './utils';

export default (data) => ({

  addNewEntryPoint: ({ctx}) => {
    const entryPoint = {
      group: 'nodes',
      data: {
        id: getId(),
        name: ctx.newEntryPointName,
      },
      classes: 'entry-point'
    };
    data.cy.add(entryPoint);
    runLayout(data.cy);
    return {
      arrow: 'added',
      ctx: updateCtxBasedOnView({
        ...ctx,
        newEntryPointName: undefined
      }, data.cy)
    }
  },

  typeNewEntryPointName: ({ctx, name}) => {
    return {
      arrow: 'typed',
      ctx: {
        ...ctx,
        newEntryPointName: name
      }
    }
  },

  cancelAddingEntryPoint: ({ctx}) => ({
    arrow: 'canceled',
    ctx: {
      ...ctx,
      newEntryPointName: undefined
    }
  }),

  render: ({ctx, thisModel}) => {
      const newEntryPointName = ctx.newEntryPointName || '';

      return [

        h('input', {
          props: {type: 'text', value: newEntryPointName},
          on: {input: e => thisModel.typeNewEntryPointName({
            name: e.target.value
          })}
        }),

        h('input', {
          props: {
            type: 'button', 
            value: 'add',
          },
          attrs: {
            disabled: !newEntryPointName,
          },
          on: {click: e => thisModel.addNewEntryPoint()}
        }),

        h('input', {
          props: {type: 'button', value: 'cancel'},
          on: {click: e => thisModel.cancelAddingEntryPoint()}
        }),

      ];
  }

});