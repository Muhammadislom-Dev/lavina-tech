export const userData = {
  state: {},
  reducers: {
    userData(state: any, payload: any) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch: any) => ({}),
};
