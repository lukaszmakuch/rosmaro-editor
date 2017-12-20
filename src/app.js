import cytoscape from 'cytoscape';
import makeStorage from 'rosmaro-in-memory-storage';
import makeLock from 'rosmaro-process-wide-lock';
import rosmaro from 'rosmaro';
const snabbdom = require('snabbdom');
const patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default,
]);
const h = require('snabbdom/h').default;
import graph from './graph.json'

const container = document.getElementById('app');

const handlers = {

  'CodeView': {

    noticeCodeChange: ({code, ctx}) => ({arrow: 'CodeChanged', ctx: {...ctx, code}}),

    load: () => ({arrow: 'CodeLoaded'}),

    render: ({ctx, thisModel}) => h('div', {}, [
      h('span', {}, 'paste the graph JSON file below'), h('br'),
      h(
        'textarea', 
        {on: {change: e => thisModel.noticeCodeChange({code: e.target.value})}},
        ctx.code
      ),
      h('br'),
      h('button', {on: {click: () => thisModel.load()}}, 'load')
    ])

  },

  'GraphEditor': {

    render: ({ctx, thisModel}) => h('div', {}, [
      h('span', {}, 'this is the graph')
    ])

  }

};

const appMachine = rosmaro({
  graph,
  handlers,
  storage: makeStorage(),
  lock: makeLock(),
  afterTransition: () => refreshView()
});
let lastView = container;
const refreshView = () => {
  const newView = appMachine.render();
  patch(lastView, newView);
  lastView = newView;
};
refreshView();