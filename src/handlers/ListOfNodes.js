const h = require('snabbdom/h').default;
import {getAllNodes, runLayout, clearView} from './utils';
import cloneDeep from 'lodash/cloneDeep';

export default (data) => ({

  handleNodeSelect: ({nodeId, ctx}) => {
    const selectedNodeType = ctx.loadedGraph[nodeId].type;
    const arrow = ({
      'leaf': 'openedLeaf',
      'graph': 'openedGraph',
      'composite': 'openedComposite'
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
    h('span.header', {}, 'Model nodes'),
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
    h('button.ctrl-button', {
      on: {click: () => thisModel.startAddingNewNode()}
    }, 'add')
  ]

});