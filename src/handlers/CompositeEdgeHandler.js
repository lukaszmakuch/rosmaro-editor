import {updateCtxBasedOnView, runLayout} from './utils';
import getId from 'uuid/v1';

export default (data) => ({

  addedEdge: ({ctx, sourceNode, targetNode, addedEles}) => {

    addedEles.remove();

  },

});