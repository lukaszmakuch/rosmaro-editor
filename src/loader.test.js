import {fromJson} from './loader';

const idGenerator = () => {
  let nextId = 0;
  return () => "id" + nextId++;
};

describe('loader', () => {

  

  describe('to JSON', () => {

    it('converts from the Rosmaro format to the Editor format', () => {

      const rosmaroFormat = {

        'main': {
          type: 'graph',
          nodes: {'A': 'A', 'B': 'B'},
          arrows: {
            'A': {
              x: {target: 'B', entryPoint: 'p'}
            }
          },
          entryPoints: {
            start: {target: 'A', entryPoint: 'start'}
          }
        },

        'A': {type: 'leaf'},

        'B': {
          type: 'composite',
          nodes: {
            'A': 'BSub',
            'B': 'BSub'
          }
        },

        'BSub': {
          type: 'graph',
          nodes: {
            A: 'BSubA',
            B: 'BSubB'
          },
          arrows: {
            A: {
              x: {target: 'B', entryPoint: 'start'}
            }
          }, 
          entryPoints: {
            start: {target: 'A', entryPoint: 'start'},
            p: {target: 'B', entryPoint: 'start'}
          }
        },

        'BSubA': {type: 'leaf'},
        'BSubB': {type: 'leaf'}
      };

      const editorFormat = {
        
        'id14': {
          name: 'main',
          type: 'graph',
          data: [

            {
              group: 'nodes',
              data: {
                id: 'id15',
                name: 'A',
                link: 'id0',
              },
              classes: 'actual-node'
            },

            {
              group: 'nodes',
              data: {
                id: 'id16',
                name: 'B',
                link: 'id11',
              },
              classes: 'actual-node'
            },

            {
              group: 'nodes',
              data: {
                id: 'id17',
                name: 'start'
              },
              classes: 'entry-point'
            },

            {
              group: 'edges',
              data: {
                id: 'id18',
                source: 'id17',
                target: 'id15',
                entryPoint: 'start',
                displayName: ':start'
              }
            },

            {
              group: 'edges',
              data: {
                id: 'id19',
                source: 'id15',
                target: 'id16',
                name: 'x',
                entryPoint: 'p',
                displayName: 'x:p'
              }
            },

          ]

        },

        'id0': {
          name: 'A',
          type: 'leaf'
        },

        'id11': {
          name: 'B',
          type: 'composite',
          data: [

            {
              group: 'nodes',
              data: {
                id: 'id12',
                name: 'A',
                link: 'id3',
              },
              classes: 'actual-node'
            },

            {
              group: 'nodes',
              data: {
                id: 'id13',
                name: 'B',
                link: 'id3',
              },
              classes: 'actual-node'
            },

          ]
        },

        'id3': {
          name: 'BSub',
          type: 'graph',
          data: [

            {
              group: 'nodes',
              data: {
                id: 'id4',
                name: 'A',
                link: 'id1',
              },
              classes: 'actual-node'
            },

            {
              group: 'nodes',
              data: {
                id: 'id5',
                name: 'B',
                link: 'id2',
              },
              classes: 'actual-node'
            },

            {
              group: 'nodes',
              data: {
                id: 'id6',
                name: 'start'
              },
              classes: 'entry-point'
            },

            {
              group: 'edges',
              data: {
                id: 'id7',
                source: 'id6',
                target: 'id4',
                entryPoint: 'start',
                displayName: ':start'
              }
            },

            {
              group: 'nodes',
              data: {
                id: 'id8',
                name: 'p'
              },
              classes: 'entry-point'
            },

            {
              group: 'edges',
              data: {
                id: 'id9',
                source: 'id8',
                target: 'id5',
                entryPoint: 'start',
                displayName: ':start'
              }
            },

            {
              group: 'edges',
              data: {
                id: 'id10',
                source: 'id4',
                target: 'id5',
                name: 'x',
                entryPoint: 'start',
                displayName: 'x:start'
              }
            },

          ]
        },

        'id1': {
          name: 'BSubA',
          type: 'leaf',
        },

        'id2': {
          name: 'BSubB',
          type: 'leaf',
        },

      };

      const result = fromJson(rosmaroFormat, idGenerator()).graph;
      expect(result).toEqual(editorFormat);
    });

  })

});