export default {
  namespace: 'cutdown',

  state: {
    disabled: false,
    text: '获取验证码',
    count: 60,
  },

  subscriptions: {},
  reducers: {
    count(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
