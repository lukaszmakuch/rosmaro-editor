import {toJson} from './../utils/loader';

export default data => ({

  generateCode: ({ctx}) => {
    const code = JSON.stringify(toJson(ctx.loadedGraph), null, 2);
    return ({
      arrow: 'generated code',
      ctx: {...ctx, code}
    })
  }

});