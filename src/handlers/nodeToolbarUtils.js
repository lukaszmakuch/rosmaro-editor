import h from './html';
import omit from 'lodash/omit';
import {
  getAllNodes
} from './utils';

const defaultName = "New node";

export const changeOpenedNodeName = ({ctx, newName}) => {
  const newCtx = {
    ...ctx,
    loadedGraph: {
      ...ctx.loadedGraph,
      [ctx.openedNode]: {
        ...ctx.loadedGraph[ctx.openedNode],
        name: newName
      }
    }
  };
  return {ctx: newCtx, arrow: 'changed node name'};
};

// a select field which allows to pick the underlaying node
export const underlayingNodeInput = ({ctx, selectedNodeData, thisModel, label}) => 
  h('label', {}, [
    label || 'underlaying node',
    h(
      'select', 
      {on: {change: e => thisModel.changeUnderlayingNode({
          newUnderlayingNodeId: e.target.value
      })}},
      [
        h('option', {props: {
          value: undefined,
          selected: !ctx.loadedGraph[selectedNodeData.link]
        }}, 'None'),
        ...getAllNodes(ctx).map(({name, id}) => h('option', {
          props: {
            value: id,
            selected: selectedNodeData.link === id
          }
        }, name))
      ]
    )
  ]);

export const removeNode = data => ({ctx}) => {
  data.cy.$('*').remove();
  const newCtx = {
    ...ctx,
    loadedGraph: omit(ctx.loadedGraph, [ctx.openedNode])
  };
  return {ctx: newCtx, arrow: 'removed node'};
};

export const openedNodeName = ctx => 
  (ctx.loadedGraph[ctx.openedNode] || {}).name || defaultName;

export const removeNodeButton = ({thisModel}) => 
  h('input', {
    props: {type: 'button', value: 'remove'},
    on: {click: e => thisModel.removeNode()}
  });

export const nodeNameInput = ({thisModel, ctx}) =>
  h('input', {
    props: {type: 'text', value: openedNodeName(ctx)},
    on: {input: e => thisModel.changeOpenedNodeName({
      newName: e.target.value || defaultName
    })}
  });