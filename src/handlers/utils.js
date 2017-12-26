export const getAllNodes = ctx => {
  return Object.keys(ctx.loadedGraph)
    .map(nodeId => ({
      id: nodeId,
      name: ctx.loadedGraph[nodeId].name
    }));
};

export const selectedGraphNodeData = ({ctx, data}) => {
  return data.cy.$(`node[id='${ctx.selectedGraphNodeId}']`).data();
};

const readGraphDataFromView = (cy) => {
  return cy
    .$('.actual-node, .actual-edge, .entry-point')
    .jsons()
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

export const getEdge = ({ctx, data}) => 
  data.cy.$(`edge[id='${ctx.selectedEdgeId}']`);