import makeStorage from 'rosmaro-in-memory-storage';
import makeLock from 'rosmaro-process-wide-lock';
import rosmaro from 'rosmaro';
const snabbdom = require('snabbdom');
const patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/attributes').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default,
]);
import graph from './graph.json'
import handlers from './handlers/all';

const container = document.getElementById('app');

const handlerData = {};

const storage = makeStorage();
const appMachine = rosmaro({
  graph,
  handlers: handlers(handlerData),
  storage: storage,
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