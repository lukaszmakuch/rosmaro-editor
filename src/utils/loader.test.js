import {fromJson, toJson} from './loader';

const idGenerator = () => {
  let nextId = 0;
  return () => "id" + nextId++;
};

const stringify = obj => JSON.stringify(obj);

describe('loader', () => {

  it('may create an empty graph', () => {
    const builtFromJson = fromJson({}, idGenerator());
    expect(builtFromJson).toEqual({});
  });

  it('converts between the Rosmaro format and the Editor format', () => {

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

      'A': {
        type: 'dynamicComposite',
        child: 'DynamicChild'
      },

      'DynamicChild': {type: 'leaf'},

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
      'BSubB': {type: 'external'}
    };

    const editorFormat = {
    "id0": {
      "name": "DynamicChild",
      "type": "leaf"
    },
    "id1": {
      "name": "A",
      "type": "dynamicComposite",
      "link": "id0"
    },
    "id2": {
      "name": "BSubA",
      "type": "leaf"
    },
    "id3": {
      "name": "BSubB",
      "type": "external"
    },
    "id4": {
      "name": "BSub",
      "type": "graph",
      "data": JSON.stringify([
        {
          "group": "nodes",
          "data": {
            "id": "id5",
            "name": "A",
            "link": "id2"
          },
          "classes": "actual-node"
        },
        {
          "group": "nodes",
          "data": {
            "id": "id6",
            "name": "B",
            "link": "id3"
          },
          "classes": "actual-node"
        },
        {
          "group": "nodes",
          "data": {
            "id": "id7",
            "name": "recent"
          },
          "classes": "recent-node"
        },
        {
          "group": "nodes",
          "data": {
            "id": "id8",
            "name": "start"
          },
          "classes": "entry-point"
        },
        {
          "group": "edges",
          "data": {
            "id": "id9",
            "source": "id8",
            "target": "id5",
            "entryPoint": "start",
            "displayName": ": start"
          },
          "classes": "actual-edge"
        },
        {
          "group": "nodes",
          "data": {
            "id": "id10",
            "name": "p"
          },
          "classes": "entry-point"
        },
        {
          "group": "edges",
          "data": {
            "id": "id11",
            "source": "id10",
            "target": "id6",
            "entryPoint": "start",
            "displayName": ": start"
          },
          "classes": "actual-edge"
        },
        {
          "group": "edges",
          "data": {
            "id": "id12",
            "source": "id5",
            "target": "id6",
            "name": "x",
            "entryPoint": "start",
            "displayName": "x : start"
          },
          "classes": "actual-edge"
        }
      ])
    },
    "id13": {
      "name": "B",
      "type": "composite",
      "data": JSON.stringify([
        {
          "group": "nodes",
          "data": {
            "id": "id14",
            "name": "A",
            "link": "id4"
          },
          "classes": "actual-node"
        },
        {
          "group": "nodes",
          "data": {
            "id": "id15",
            "name": "B",
            "link": "id4"
          },
          "classes": "actual-node"
        }
      ])
    },
    "id16": {
      "name": "main",
      "type": "graph",
      "data": JSON.stringify([
        {
          "group": "nodes",
          "data": {
            "id": "id17",
            "name": "A",
            "link": "id1"
          },
          "classes": "actual-node"
        },
        {
          "group": "nodes",
          "data": {
            "id": "id18",
            "name": "B",
            "link": "id13"
          },
          "classes": "actual-node"
        },
        {
          "group": "nodes",
          "data": {
            "id": "id19",
            "name": "recent"
          },
          "classes": "recent-node"
        },
        {
          "group": "nodes",
          "data": {
            "id": "id20",
            "name": "start"
          },
          "classes": "entry-point"
        },
        {
          "group": "edges",
          "data": {
            "id": "id21",
            "source": "id20",
            "target": "id17",
            "entryPoint": "start",
            "displayName": ": start"
          },
          "classes": "actual-edge"
        },
        {
          "group": "nodes",
          "data": {
            "id": "id22",
            "name": "history"
          },
          "classes": "entry-point"
        },
        {
          "group": "edges",
          "data": {
            "id": "id23",
            "source": "id22",
            "target": "id19",
            "entryPoint": "start",
            "displayName": ": start"
          },
          "classes": "actual-edge"
        },
        {
          "group": "edges",
          "data": {
            "id": "id24",
            "source": "id17",
            "target": "id18",
            "name": "x",
            "entryPoint": "p",
            "displayName": "x : p"
          },
          "classes": "actual-edge"
        }
      ])
    }
  };

    const builtFromJson = fromJson(rosmaroFormat, idGenerator());
    expect(builtFromJson).toEqual(editorFormat);
    const builtJson = toJson(builtFromJson);
    expect(builtJson).toEqual(rosmaroFormat);
    
  });

});