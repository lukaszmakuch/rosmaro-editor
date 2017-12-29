const mergeRes = (resA, resB) => ({
  graph: {...resA.graph, ...resB.graph},
  ids: {...resA.ids, ...resB.ids}
});

const alreadyBuilt = (builtSoFar, node) => 
  builtSoFar.ids[node] !== undefined;

const flatten = arr => arr.reduce((flat, elem) => [...flat, ...elem], []);

const buildChildren = (
  json,
  getId,
  children,
  builtSoFar
) => {
  return children.reduce((builtSoFar, child) => {
    if (alreadyBuilt(builtSoFar, child)) return builtSoFar;

    return mergeRes(builtSoFar, fromJsonInnerFn(
      json,
      getId,
      child,
      builtSoFar
    ));
  }, builtSoFar);
};

const stringifyData = graph => {
  if (!graph.data) {
    return graph;
  }

  return {
    ...graph,
    data: JSON.stringify(graph.data)
  }
}

export const fromJson = (json, getId) => {
  const {graph} = fromJsonInnerFn(json, getId);

  return Object.keys(graph).reduce((soFar, id) => ({
    ...soFar,
    [id]: stringifyData(graph[id])
  }), {});

};

const fromJsonInnerFn = (
  json,
  getId,
  node = 'main',
  builtSoFar = {graph: {}, ids: {}}
) => {
  const nodeJson = json[node];
  if (!nodeJson && node == 'main') return {graph: {}, ids: {}};

  if (nodeJson.type === 'leaf') {
    if (alreadyBuilt(builtSoFar, node)) return builtSoFar;
    const id = getId();
    return mergeRes(builtSoFar, {
      graph: {
        [id]: {
          name: node,
          type: 'leaf'
        }
      },
      ids: {
        [node]: id
      }
    });
  }

  if (nodeJson.type === 'graph') {
    const builtChildren = buildChildren(
      json,
      getId,
      Object.values(nodeJson.nodes),
      builtSoFar
    );
    if (alreadyBuilt(builtChildren, node)) return builtChildren;
    const id = getId();

    const localChildren = Object.keys(nodeJson.nodes).reduce((soFar, localChild) => ({
      ...soFar,
      [localChild]: {
        group: 'nodes',
        data: {
          id: getId(),
          name: localChild,
          link: builtChildren.ids[nodeJson.nodes[localChild]]
        },
        classes: 'actual-node'
      }
    }), {});

    const specialRecentNodeId = getId();

    return mergeRes(builtChildren, {
      graph: {
        [id]: {
          name: node,
          type: 'graph',
          data: [

            //nodes
            ...Object.values(localChildren),

            //special "recent" node
            {
              group: 'nodes',
              data: {
                id: specialRecentNodeId,
                name: 'recent',
              },
              classes: 'recent-node'
            },

            //entry points
            ...flatten(Object.keys(nodeJson.entryPoints).map(point => {
              const entryPointId = getId();
              const pointData = nodeJson.entryPoints[point];
              const targetId = pointData.target === 'recent'
                ? specialRecentNodeId
                : localChildren[pointData.target].data.id;

              return [
                {
                  group: 'nodes',
                  data: {
                    id: entryPointId,
                    name: point,
                  },
                  classes: 'entry-point'
                },
                {
                  group: 'edges',
                  data: {
                    id: getId(),
                    source: entryPointId,
                    target: targetId,
                    entryPoint: pointData.entryPoint,
                    displayName: ": " + pointData.entryPoint
                  },
                  classes: 'actual-edge'
                },
              ];
            })),

            //arrows
            ...flatten(Object.keys(nodeJson.arrows).map(arrowSrc => 
              Object.keys(nodeJson.arrows[arrowSrc]).map(arrowName => ({
                group: 'edges',
                data: {
                  id: getId(),
                  source: localChildren[arrowSrc].data.id,
                  target: localChildren[nodeJson.arrows[arrowSrc][arrowName].target].data.id,
                  name: arrowName,
                  entryPoint: nodeJson.arrows[arrowSrc][arrowName].entryPoint,
                  displayName: arrowName + " : " + nodeJson.arrows[arrowSrc][arrowName].entryPoint
                },
                classes: 'actual-edge'
              }))
            ))

          ]
        }
      },
      ids: {
        [node]: id
      }
    });
  }

  if (nodeJson.type === 'composite') {
    const builtChildren = buildChildren(
      json,
      getId,
      Object.values(nodeJson.nodes),
      builtSoFar
    );
    if (alreadyBuilt(builtChildren, node)) return builtChildren;
    const id = getId();
    return mergeRes(builtChildren, {
      graph: {
        [id]: {
          name: node,
          type: 'composite',
          data: Object.keys(nodeJson.nodes).map(childName => ({
            group: 'nodes',
            data: {
              id: getId(),
              name: childName,
              link: builtChildren.ids[nodeJson.nodes[childName]]
            },
            classes: 'actual-node'
          }))
        }
      },
      ids: {
        [node]: id
      }
    });
  }

};

const getElement = (elements, id) =>
  elements.find(ele => ele.data.id == id);

const isEdge = ele => ele.classes == 'actual-edge';

const blah = (elements, dataset) => {
  return elements.reduce(
    (built, ele) => {
      if (!isEdge(ele)) return built;
      const source = getElement(elements, ele.data.source);
      const target = getElement(elements, ele.data.target);
      if (
        source.classes == 'actual-node'
        && target.classes == 'actual-node'
      ) {
        // an arrow between nodes
        return {
          ...built,
          arrows: {
            ...built.arrows,
            [source.data.name]: {
              ...(built.arrows[source.data.name] || {}),
              [ele.data.name]: {
                target: target.data.name,
                entryPoint: ele.data.entryPoint
              }
            }
          }
        };
      } else {
        // an entry point
        return {
          ...built,
          entryPoints: {
            ...built.entryPoints,
            [source.data.name]: {
              target: target.data.name,
              entryPoint: ele.data.entryPoint
            }
          }
        };
      }
    }, 
    {'arrows': {}, 'entryPoints': {}}
  );
};

const graphToJson = (dataset, id) => {
  const elements = graphElements(dataset, id);
  const nodes = buildNodes(elements, dataset);

  return {
    [nodeName(dataset, id)]: {
      type: "graph",
      nodes,
      ...blah(elements, dataset),
    }
  };
};

const nodeName = (dataset, id) => dataset[id].name;

const leafToJson = (dataset, id) => {
  return {
    [nodeName(dataset, id)]: {
      type: "leaf"
    }
  };
};

const graphElements = (dataset, id) => {
  const nodeData = dataset[id];
  return JSON.parse(nodeData.data);
};

const buildNodes = (elements, dataset) => {
  return elements
    .filter(ele => ele.classes == 'actual-node')
    .reduce((nodes, node) => ({
      ...nodes,
      [node.data.name]: nodeName(dataset, node.data.link)
    }), {});
};

const compositeToJson = (dataset, id) => {
  const elements = graphElements(dataset, id);
  const nodes = buildNodes(elements, dataset);
  return {
    [nodeName(dataset, id)]: {
      type: "composite",
      nodes
    }
  };
};

const nodeToJson = (dataset, id) => {
  const type = dataset[id].type;
  if (type === 'graph') return graphToJson(dataset, id);
  if (type === 'leaf') return leafToJson(dataset, id);
  if (type === 'composite') return compositeToJson(dataset, id);
};

export const toJson = dataset => {
  return Object.keys(dataset).reduce((built, id) => {
    return {
      ...built,
      ...nodeToJson(dataset, id)
    };
  }, {});
};