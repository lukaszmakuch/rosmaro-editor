const h = require('snabbdom/h').default;

export default () => ({

  render: ({ctx, thisModel}) => {
      const newChildNodeName = 'name';

      return [

        h('input', {
          props: {type: 'text', value: newChildNodeName},
          on: {input: e => thisModel.changeOpenedNodeName({
            newName: e.target.value
          })}
        }),

        h('input', {
          props: {type: 'button', value: 'add'},
          on: {click: e => thisModel.addChildNode()}
        }),

        h('input', {
          props: {type: 'button', value: 'cancel'},
          on: {click: e => thisModel.addEntryPoint()}
        }),

      ];
  }

});