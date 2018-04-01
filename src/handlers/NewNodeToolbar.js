import {updateCtxBasedOnView, runLayout, clearView} from './utils';
import h from './html';
import getId from 'uuid/v1';

const defaultType = 'leaf';
const nodeTypes = ["leaf", "graph", "composite", "dynamicComposite"];

const newNodeName = ctx => ctx.newNodeName || "";

const newNode = ctx => {
  const type = ctx.newNodeType || defaultType;
  const name = ctx.newNodeName;
  if (type === 'leaf') {
    return {
      [getId()]: {
        type: 'leaf', 
        name
      }
    };
  }

  if (type === 'composite') {
    return {
      [getId()]: {
        type: 'composite', 
        name,
        data: '[]'
      }
    };
  }

  if (type === 'dynamicComposite') {
    return {
      [getId()]: {
        type: 'dynamicComposite', 
        name,
        data: '[]'
      }
    };
  }

  if (type === 'graph') {
    return {
      [getId()]: {
        type: 'graph', 
        name,
        data: JSON.stringify([
          {
            group: 'nodes',
            data: {
              id: getId(),
              name: 'recent'
            },
            classes: 'recent-node'
          },
          {
            group: 'nodes',
            data: {
              id: getId(),
              name: 'start'
            },
            classes: 'entry-point'
          },
        ])
      }
    };
  }
};

export default (data) => ({

  onEntry: () => {
    clearView(data);
  },

  typeNewNodeName: ({ctx, name}) => {
    return {
      arrow: 'typed name',
      ctx: {
        ...ctx,
        newNodeName: name
      }
    };
  },

  changeNewNodeType: ({ctx, type}) => {
    return {
      arrow: 'changed type',
      ctx: {
        ...ctx,
        newNodeType: type
      }
    };
  },

  addNewNode: ({ctx}) => {
    const node = newNode(ctx);
    const newCtx = {...ctx,
      newNodeType: undefined,
      newNodeName: undefined,
      loadedGraph: {
        ...ctx.loadedGraph,
        ...node
      }
    };
    return {
      ctx: newCtx,
      arrow: 'added'
    };
  },

  render: ({ctx, thisModel}) => {
    const enteredName = newNodeName(ctx);
    const selectedType = ctx.newNodeType || defaultType;
    return [

      h('label', {}, [
        'name',
        h('input', {
          props: {type: 'text', value: enteredName},
          on: {input: e => thisModel.typeNewNodeName({
            name: e.target.value
          })}
        }),
      ]),

      h('label', {}, [
        'type',
        h(
          'select', 
          {on: {change: e => thisModel.changeNewNodeType({
            type: e.target.value
          })}},
          [
            ...nodeTypes.map(type => h('option', {
              props: {
                value: type,
                selected: selectedType === type
              }
            }, type))
          ]
        )
      ]),

      h('input', {
        props: {type: 'button', value: 'add'},
        attrs: {disabled: !enteredName},
        on: {click: e => thisModel.addNewNode()}
      }),

    ];
  }

});