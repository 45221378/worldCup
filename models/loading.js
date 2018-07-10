export default {
  namespace: 'load',

  state: false,

  subscriptions: {},
  reducers: {
    save(state, action) {
      return action.payload;
    },
  },
};
