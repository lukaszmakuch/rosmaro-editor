const h = require('snabbdom/h').default;
import cytoscapeConfig from './../cytoscapeConfig';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
cytoscape.use(edgehandles);

export default (data) => ({

  tryingToCreateLoop: ({targetNode}) => {
    // Loops are allowed only for actual nodes.
    return targetNode.hasClass('actual-node');
  },

  clickedBackground: ({ele}) => {
    return {arrow: 'clicked background'};
  },

  clickedActualNode: ({ctx, ele}) => {
    return {
      ctx: {
        ...ctx,
        selectedChildNodeId: ele.data().id,
      },
      arrow: 'clicked child node'
    };
  },

  clickedEntryPoint: ({ctx, ele}) => {
    return {
      ctx: {
        ...ctx,
        selectedEntryPointId: ele.data().id,
      },
      arrow: 'clicked entry point'
    };
  },

  clickedEdgeBetweenNodes: ({ele, ctx}) => {
    return {
      arrow: 'clicked edge between nodes',
      ctx: {
        ...ctx,
        selectedEdgeId: ele.data().id
      }
    };
  },

  clickedEdgeFromEntryPoint: ({ele, ctx}) => {
    return {
      arrow: 'clicked entry point edge',
      ctx: {
        ...ctx,
        selectedEdgeId: ele.data().id
      }
    };
  },

  graphViewIsReady: ({ctx}) => {
    return ({arrow: 'graph view is ready'})
  },

  render: ({thisModel}) => h('div#graph-view', {
    hook: {
      insert: ({elm}) => {
        setTimeout(() => {
          data.cy = cytoscape({
            container: elm,
            style: cytoscapeConfig.style
          });
          data.eh = data.cy.edgehandles({

            loopAllowed: node => thisModel.tryingToCreateLoop({targetNode: node}),

            complete: (sourceNode, targetNode, addedEles) => 
              thisModel.addedEdge({sourceNode, targetNode, addedEles})

          });

          data.cy.on('tap', ({target}) => {
            if (target === data.cy) {
              thisModel.clickedBackground({ele: target});
            }
          });

          data.cy.on('tap', 'node.actual-node', ({target}) => {
            thisModel.clickedActualNode({ele: target});
          });

          data.cy.on('tap', 'node.entry-point', ({target}) => {
            thisModel.clickedEntryPoint({ele: target});
          });

          data.cy.on('tap', 'edge', ({target}) => {
            const fromEntryPoint = target.source().hasClass('entry-point');
            const params = {ele: target};
            if (fromEntryPoint) thisModel.clickedEdgeFromEntryPoint(params)
              else thisModel.clickedEdgeBetweenNodes(params);
          });

          thisModel.graphViewIsReady();
        }, 0);
      }
    }
  })

});