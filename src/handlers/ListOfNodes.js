const h = require('snabbdom/h').default;
import {getAllNodes, runLayout, clearView} from './utils';
import cloneDeep from 'lodash/cloneDeep';

export default (data) => ({

  handleNodeSelect: ({nodeId, ctx}) => {
    const selectedNodeType = ctx.loadedGraph[nodeId].type;
    const arrow = ({
      'leaf': 'opened leaf',
      'graph': 'opened graph',
      'composite': 'opened composite'
    })[selectedNodeType];
    clearView(data);
    const graphToLoad = JSON.parse(ctx.loadedGraph[nodeId].data || '[]');
    data.cy.json({elements: graphToLoad});
    runLayout(data.cy);

    return {
      arrow, 
      ctx: {...ctx, openedNode: nodeId}
    };
  },

  startAddingNewNode: ({ctx}) => ({
    arrow: 'started adding node',
    ctx: {...ctx, openedNode: undefined}
  }),

  render: ({ctx, thisModel}) => [
    h('div.header', {}, [
      h('h1', {}, 'Rosmaro nodes'),
    ]),
    h('ul.nodes', {}, getAllNodes(ctx).map(({id, name}) => 
      h(
        'li', 
        {
          class: {active: ctx.openedNode === id},
          on: {click: () => thisModel.handleNodeSelect({nodeId: id})}
        },
        name
      )
    )),
    h('div.ctrl-buttons', {}, [
      h('input', {
        props: {type: 'button', value: 'add node'},
        on: {click: () => thisModel.startAddingNewNode()}
      }),
      h('input.ctrl-button', {
        props: {type: 'button', value: 'generate code'},
        on: {click: e => thisModel.generateCode()}
      }),
    ])
  ]

});