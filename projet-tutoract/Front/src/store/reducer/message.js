// --- initial state
const initialState = {
  user: null,
  firstname: '',
  content: '',
  idContent: null,
  messageData: [],
};

// --- action types
const SET_CONTENTS = 'SET_CONTENTS';
export const GET_CONTENT = 'GET_CONTENT';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
// --- Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CONTENTS:
      return {
        ...state,
        messageData: action.data,
      };
    default: return state;
  }
};

export const getContent = () => ({
  type: GET_CONTENT,
});
export const setNewContents = (data) => ({
  type: SET_CONTENTS,
  data,
});

export default reducer;
