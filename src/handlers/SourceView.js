import {fromJson} from './../utils/loader';
const h = require('snabbdom/h').default;
import getId from 'uuid/v1';

export default () => ({
  noticeCodeChange: ({code, ctx}) => {
    const newCtx = {...ctx, code};
    return {arrow: 'codeEdited', ctx: newCtx};
  },

  open: ({ctx}) => ({
    ctx: {...ctx,
      loadedGraph: fromJson(JSON.parse(ctx.code), getId)
    },
    arrow: 'codeOpened'
  }),

  render: ({ctx, thisModel}) => h('div', {}, [
    h('span', {}, 'paste the graph JSON file below'), h('br'),
    h(
      'textarea', 
      {on: {change: e => thisModel.noticeCodeChange({code: e.target.value})}},
      ctx.code
    ),
    h('br'),
    h('button', {on: {click: () => thisModel.open()}}, 'open')
  ])
});