export default {
  namespace: 'showLogin',

  state: 'none',

  subscriptions: {},
  reducers: {
    save(state, action) {
      return action.payload;
    },
  },
};
