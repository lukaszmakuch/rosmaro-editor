import {fromJson} from './../utils/loader';
const h = require('snabbdom/h').default;
import getId from 'uuid/v1';

export default (data, msg = () => "") => ({
  noticeCodeChange: ({code, ctx}) => {
    const newCtx = {...ctx, code};
    return {arrow: 'code edited', ctx: newCtx};
  },

  open: ({ctx}) => {
    try {
      const loadedGraph = fromJson(JSON.parse(ctx.code || '{}'), getId);
      return {
        ctx: {...ctx, loadedGraph},
        arrow: 'code opened'
      };
    } catch (e) {
      return {
        arrow: 'error'
      };
    }
  },

  render: ({ctx, thisModel}) => 
    h('div.container', {}, [
      h('h1', {}, 'Rosmaro Editor'),
      h("div.subheader", {}, [
        h('a', {props: {'target': '_blank', 'href': 'https://rosmaro.js.org'}}, 'rosmaro.js.org')
      ]),
      h(
        'textarea.source', 
        {
          on: {input: e => thisModel.noticeCodeChange({code: e.target.value})},
          props: {'placeholder': 'Rosmaro graph JSON goes here'}
        },
        ctx.code
      ),
      h('div.source-navigation', {}, [
        msg({ctx}),
        h('input', {
          on: {click: () => thisModel.open()},
          props: {'type': 'button', value: 'load'}
        })
      ]),
    ])
  });