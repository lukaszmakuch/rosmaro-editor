const h = require('snabbdom/h').default;
import cytoscapeConfig from './../cytoscapeConfig';
import {getAllNodes} from './utils';
import cloneDeep from 'lodash/cloneDeep';

const runLayout = cy => {
  cy.layout(cytoscapeConfig.layout).run();
};

export default (data) => ({

  handleNodeSelect: ({nodeId, ctx}) => {
    const selectedNodeType = ctx.loadedGraph[nodeId].type;
    const arrow = ({
      'leaf': 'openedLeaf',
      'graph': 'openedGraph',
      'composite': 'openedComposite'
    })[selectedNodeType];

    const graphToLoad = JSON.parse(ctx.loadedGraph[nodeId].data);
    data.cy.json({elements: graphToLoad});
    runLayout(data.cy);

    return {
      arrow, 
      ctx: {...ctx, openedNode: nodeId}
    };
  },

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
    h('button.ctrl-button', {}, 'add')
  ]

});