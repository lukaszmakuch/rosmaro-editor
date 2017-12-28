import cytoscapeConfig from './../cytoscapeConfig';

export const clearView = ({cy}) => {
  cy.$('*').remove();
};

export const getAllNodes = ctx => {
  return Object.keys(ctx.loadedGraph)
    .map(nodeId => ({
      id: nodeId,
      name: ctx.loadedGraph[nodeId].name
    }));
};

export const selectedChildNodeData = ({ctx, data}) => {
  return data.cy.$(`node[id='${ctx.selectedChildNodeId}']`).data();
};

const readGraphDataFromView = (cy) => {
  return [
      ...cy.$('.actual-node').jsons(),
      ...cy.$('.entry-point').jsons(),
      ...cy.$('.recent-node').jsons(),
      ...cy.$('.actual-edge').jsons(),
    ]
    .map(({group, data, classes}) => ({group, data, classes}));
};

export const updateCtxBasedOnView = (ctx, cy) => {
  const readFromView = readGraphDataFromView(cy);
  const newCtx = {
    ...ctx,
    loadedGraph: {
      ...ctx.loadedGraph,
      [ctx.openedNode]: {
        ...ctx.loadedGraph[ctx.openedNode],
        data: JSON.stringify(readFromView)
      }
    }
  };
  return newCtx;
};

export const runLayout = cy => {
  cy.layout(cytoscapeConfig.layout).run();
};

export const getEdge = ({ctx, data}) => 
  data.cy.$(`edge[id='${ctx.selectedEdgeId}']`);