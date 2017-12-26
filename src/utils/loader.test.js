import {fromJson} from './loader';

const idGenerator = () => {
  let nextId = 0;
  return () => "id" + nextId++;
};

const stringify = obj => JSON.stringify(obj);

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
            start: {target: 'A', entryPoint: 'start'},
            history: {target: 'recent', entryPoint: 'start'}
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
        
        'id15': {
          name: 'main',
          type: 'graph',
          data: stringify([

            {
              group: 'nodes',
              data: {
                id: 'id16',
                name: 'A',
                link: 'id0',
              },
              classes: 'actual-node'
            },

            {
              group: 'nodes',
              data: {
                id: 'id17',
                name: 'B',
                link: 'id12',
              },
              classes: 'actual-node'
            },

            {
              group: 'nodes',
              data: {
                id: 'id18',
                name: 'recent'
              },
              classes: 'recent-node'
            },

            {
              group: 'nodes',
              data: {
                id: 'id19',
                name: 'start'
              },
              classes: 'entry-point'
            },

            {
              group: 'edges',
              data: {
                id: 'id20',
                source: 'id19',
                target: 'id16',
                entryPoint: 'start',
                displayName: ':start'
              },
              classes: 'actual-edge'
            },

            {
              group: 'nodes',
              data: {
                id: 'id21',
                name: 'history',
              },
              classes: 'entry-point'
            },

            {
              group: 'edges',
              data: {
                id: 'id22',
                source: 'id21',
                target: 'id18',
                entryPoint: 'start',
                displayName: ':start',
              },
              classes: 'actual-edge'
            },

            {
              group: 'edges',
              data: {
                id: 'id23',
                source: 'id16',
                target: 'id17',
                name: 'x',
                entryPoint: 'p',
                displayName: 'x:p'
              },
              classes: 'actual-edge'
            },

          ])

        },

        'id0': {
          name: 'A',
          type: 'leaf'
        },

        'id12': {
          name: 'B',
          type: 'composite',
          data: stringify([

            {
              group: 'nodes',
              data: {
                id: 'id13',
                name: 'A',
                link: 'id3',
              },
              classes: 'actual-node'
            },

            {
              group: 'nodes',
              data: {
                id: 'id14',
                name: 'B',
                link: 'id3',
              },
              classes: 'actual-node'
            },

          ])
        },

        'id3': {
          name: 'BSub',
          type: 'graph',
          data: stringify([

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
              group:"nodes",
              data:{
                id: "id6",
                name: "recent"
              },
              classes: "recent-node"
            },

            {
              group: 'nodes',
              data: {
                id: 'id7',
                name: 'start'
              },
              classes: 'entry-point'
            },

            {
              group: 'edges',
              data: {
                id: 'id8',
                source: 'id7',
                target: 'id4',
                entryPoint: 'start',
                displayName: ':start'
              },
              classes: 'actual-edge'
            },

            {
              group: 'nodes',
              data: {
                id: 'id9',
                name: 'p'
              },
              classes: 'entry-point'
            },

            {
              group: 'edges',
              data: {
                id: 'id10',
                source: 'id9',
                target: 'id5',
                entryPoint: 'start',
                displayName: ':start'
              },
              classes: 'actual-edge'
            },

            {
              group: 'edges',
              data: {
                id: 'id11',
                source: 'id4',
                target: 'id5',
                name: 'x',
                entryPoint: 'start',
                displayName: 'x:start'
              },
              classes: 'actual-edge'
            },

          ])
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

      const result = fromJson(rosmaroFormat, idGenerator());
      expect(result).toEqual(editorFormat);
    });

  })

});