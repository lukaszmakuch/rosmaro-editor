import {toJson} from './../utils/loader';

export default data => ({

  generateCode: ({ctx}) => {
    try {
      const code = JSON.stringify(toJson(ctx.loadedGraph), null, 2);
      return ({
        arrow: 'generated code',
        ctx: {...ctx, code}
      })
    } catch (e) {
      const msg = 'Unable to generate the code.';
      return ({
        arrow: 'code generation error',
        ctx: {
          ...ctx,
          errors: [...(ctx.errors || []), msg]
        }
      })
    }
  }

});