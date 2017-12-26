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
                    displayName: ":" + pointData.entryPoint
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
                  displayName: arrowName + ":" + nodeJson.arrows[arrowSrc][arrowName].entryPoint
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

export const toJSON = dataset => {

};