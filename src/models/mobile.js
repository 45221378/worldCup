import { baseURL } from './../utils/ajax';
export default {
  namespace: 'mobile',
  state: {
    telephone: '',
    capCodeSrc: '',
  },

  subscriptions: {},

  reducers: {
    save(state, action) {
      state.capCodeSrc = `${baseURL}customer/imgCode/${action.payload.telephone}?${Date.now()}`;

      return { ...state, ...action.payload };
    },
  },
};
