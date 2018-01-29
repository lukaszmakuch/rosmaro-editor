import {updateCtxBasedOnView, getEdge} from './utils';

export const changeSelectedEdgeEntryPoint = ({data, updateEdgeDisplayName}) => 
  ({ctx, newEntryPoint}) => {
    const edge = getEdge({ctx, data});
    edge.data('entryPoint', newEntryPoint);
    updateEdgeDisplayName(edge);
    return {
      arrow: 'changed edge entry point',
      ctx: updateCtxBasedOnView(ctx, data.cy)
    };
  };

export const deleteSelectedEdge = data => ({ctx}) => {
  getEdge({ctx, data}).remove();
  return {
    arrow: 'removed edge',
    ctx: updateCtxBasedOnView(ctx, data.cy)
  };
};