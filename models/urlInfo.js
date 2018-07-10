import qs from 'qs';
export default {
  namespace: 'urlInfo',
  state: {},
  reducers: {
    save(state, action) {
      // console.log(action.payload);
      return { ...action.payload };
    },
  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        //window.scrollTo(0, 0);
        const searchObj = Object.assign({}, qs.parse(search.slice(1)));

        if (Object.keys(searchObj).length > 0 && searchObj.mobile) {
          dispatch({
            type: 'save',
            payload: searchObj,
          });
        }
      });
    },
  },
};
