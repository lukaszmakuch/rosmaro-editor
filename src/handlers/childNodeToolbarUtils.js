import getId from 'uuid/v1';
const h = require('snabbdom/h').default;
import {updateCtxBasedOnView, runLayout} from './utils';

export const typeNewChildNodeName = ({ctx, name}) => {
  return {
    arrow: 'typed',
    ctx: {
      ...ctx,
      newChildNodeName: name
    }
  };
};

const defaultChildName = 'New child node';

export const newChildNodeName = ({ctx}) => {
  return ctx.newChildNodeName || defaultChildName;
};

export const addChildNode = ({data}) => ({ctx}) => {
  const node = {
    group: 'nodes',
    data: {
      id: getId(),
      name: newChildNodeName({ctx}),
      link: undefined,
    },
    classes: 'actual-node'
  };
  data.cy.add(node);
  runLayout(data.cy);
  return {
    arrow: 'added',
    ctx: updateCtxBasedOnView({
      ...ctx,
      newChildNodeName: undefined
    }, data.cy)
  };
};

export const cancelAddingChildNodeButton = ({thisModel}) => h('input', {
  props: {type: 'button', value: 'cancel'},
  on: {click: e => thisModel.cancelAddingChildNode()}
});

export const cancelAddingChildNode = ({ctx}) => ({
  arrow: 'canceled',
  ctx: {
    ...ctx,
    newChildNodeName: undefined
  }
});