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
    return {arrow: 'clickedBackground'};
  },

  clickedActualNode: ({ctx, ele}) => {
    return {
      ctx: {
        ...ctx,
        selectedGraphNodeId: ele.data().id,
      },
      arrow: 'clickedGraphNode'
    };
  },

  clickedEntryPoint: ({ctx, ele}) => {
    return {
      ctx: {
        ...ctx,
        selectedEntryPointId: ele.data().id,
      },
      arrow: 'clickedEntryPoint'
    };
  },

  clickedEdgeBetweenNodes: ({ele, ctx}) => {
    return {
      arrow: 'clickedEdgeBetweenNodes',
      ctx: {
        ...ctx,
        selectedEdgeId: ele.data().id
      }
    };
  },

  clickedEdgeFromEntryPoint: ({ele, ctx}) => {
    return {
      arrow: 'clickedEntryPointEdge',
      ctx: {
        ...ctx,
        selectedEdgeId: ele.data().id
      }
    };
  },

  graphViewIsReady: ({ctx}) => {
    return ({arrow: 'graphViewIsReady'})
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
            ;
          });

          thisModel.graphViewIsReady();
        }, 0);
      }
    }
  })

});