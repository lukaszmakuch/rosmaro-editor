import {updateCtxBasedOnView, runLayout} from './utils';
import getId from 'uuid/v1';

export default (data) => ({

  addedEdge: ({ctx, sourceNode, targetNode, addedEles}) => {

    if (
      sourceNode.hasClass('actual-node')
      && targetNode.hasClass('actual-node')
    ) {
      // Actual node -> Actual node
      addedEles.json({
        group: 'edges',
        data: {
          id: getId(),
          source: sourceNode.data().id,
          target: targetNode.data().id,
          entryPoint: 'start',
          displayName: 'action:start',
          name: 'action'
        },
        classes: 'actual-edge'
      });
    } else if (
      (
        sourceNode.hasClass('entry-point')
        && targetNode.hasClass('recent-node')
      )
      || (
        sourceNode.hasClass('entry-point')
        && targetNode.hasClass('actual-node')
      )
    ) {
      // Entry point -> Recent
      // Entry point -> Actual node
      const srcId = sourceNode.data().id;

      const fromSrc = data.cy.$(`edge[source = "${srcId}"]`);
      fromSrc.remove();
      data.cy.add({
        group: 'edges',
        data: {
          id: getId(),
          source: sourceNode.data().id,
          target: targetNode.data().id,
          entryPoint: 'start',
          displayName: ':start'
        },
        classes: 'actual-edge'
      });
    } else {
      // The drawn arrow is incorrect. Remove it from the view.
      addedEles.remove();
    }

    return {
      arrow: 'updatedEdges',
      ctx: updateCtxBasedOnView(ctx, data.cy)
    };

  },

});