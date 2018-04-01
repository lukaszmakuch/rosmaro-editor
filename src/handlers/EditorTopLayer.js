import h from './html';

export default (data) => ({

  closeErrors: ({ctx}) => ({
    arrow: 'errors closed',
    ctx: {
      ...ctx,
      errors: undefined
    }
  }),

  render: ({ctx, thisModel}) => {
    return h(
      'div.errors', 
      {on: {click: e => thisModel.closeErrors()}}, 
      (ctx.errors || []).map(err => h('span.error', {}, err))
    );
  }

});