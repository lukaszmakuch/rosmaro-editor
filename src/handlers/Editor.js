const h = require('snabbdom/h').default;

export default (data) => ({

  afterRender: ({res}) => 
    h('div.editor', {}, [
      h('div.main-screen', {}, [
        h('div.node-list', {}, res.NodeList),
        res.GraphView
      ]),
      h('div.toolbar', {}, res.Toolbar)
    ])
    
});