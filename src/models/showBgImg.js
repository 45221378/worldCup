export default {
  namespace: 'showBgImg',

  state: 'none',

  subscriptions: {},
  reducers: {
    save(state, action) {
      return action.payload;
    },
  },
};
