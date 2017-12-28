export default {
  
  layout: {
    name: 'breadthfirst',
    animate: true,
    animationDuration: 500,
    padding: 50,
    spacingFactor: 2,
    minNodeSpacing: 100,
    nodeDimensionsIncludeLabels: true,
  },

  handlers: {
   
  },

  style: [

    {
      selector: 'node',
      style: {
        'width': 'label',
        'min-width': 100,
        'height': 'label',
        'padding': 10,
        'text-halign': 'center',
        'text-valign': 'center',
        'shape': 'roundrectangle',
        'border-color': '#000',
        'border-width': 3,
        'background-color': '#fff',
        'label': 'data(name)'
      }
    },

    {
      selector: '.entry-point, .recent-node',
      style: {
        'width': 'label',
        'min-width': 100,
        'height': 'label',
        'padding': 10,
        'text-halign': 'center',
        'text-valign': 'center',
        'shape': 'ellipse',
        'border-color': '#000',
        'border-width': 10,
        'color': '#fff',
        'border-style': 'double',
        'background-color': '#000',
        'label': 'data(name)'
      }

    },

    {
      selector: '.eh-handle',
      style: {
        'width': 10,
        height: 10,
        'background-color': '#000'
      }
    },

    {
      selector: 'edge',
      css: {
        'arrow-scale': 2,
        'loop-direction': '45deg',
        'curve-style': 'bezier',
        'control-point-step-size': 200,
        'target-arrow-shape': 'triangle',
        'target-arrow-color': '#000',
        'text-background-color': '#fff',
        'text-background-shape': 'roundrectangle',
        'text-background-opacity': 1,
        'label': 'data(displayName)',
        'width': 3,
        'line-color': '#000',
      }
    }

  ]
};