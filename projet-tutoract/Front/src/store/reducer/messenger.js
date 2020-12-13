// --- initial state
const initialState = {
  eventId: null,
  techName: '',
  owner: {},
  users: [],
  eventRedirect: false,
  tech: {},
  description: '',
  content: '',
};

// --- action types
const HANDLE_INFO_EVENT = 'HANDLE_INFO_EVENT';
const SET_INFOS = 'SET_INFOS';
const EVENT_REDIRECT_ON = 'EVENT_REDIRECT_ON';
const EVENT_REDIRECT_OFF = 'EVENT_REDIRECT_OFF';
const GET_DESCRIPTIONS = 'GET_DESCRIPTIONS';
const HANDLE_CONTENT = 'HANDLE_CONTENT';
export const GET_CONTENT = 'GET_CONTENT';
const CLEAR_INPUT = 'CLEAR_INPUT';
export const SUBMIT_CONTENT = 'SUBMIT_CONTENT';
export const GET_INFO_USERS = 'GET_INFO_USERS';
export const GET_INFO_EVENT = 'GET_INFOS_EVENT';
export const GET_MERCURE = 'GET_MERCURE';

// --- Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case HANDLE_INFO_EVENT:
      return {
        ...state,
        eventId: action.eventId,
        techName: action.techEvent,
      };
    case SET_INFOS:
      return {
        ...state,
        owner: action.owner,
        users: action.users,
      };
    case EVENT_REDIRECT_ON:
      return {
        ...state,
        eventRedirect: true,
      };
    case EVENT_REDIRECT_OFF:
      return {
        ...state,
        eventRedirect: false,
      };
    case GET_DESCRIPTIONS:
      return {
        ...state,
        tech: action.tech,
        description: action.description,
      };
    case HANDLE_CONTENT:
      return {
        ...state,
        content: action.content,
      };
    case CLEAR_INPUT:
      return {
        ...state,
        content: '',
      };
    default: return state;
  }
};

export const sendInfos = (eventId, techEvent) => ({
  type: HANDLE_INFO_EVENT,
  eventId,
  techEvent,
});
export const sendSubmit = () => ({
  type: GET_INFO_USERS,
});
export const getEventInfos = (owner, users) => ({
  type: SET_INFOS,
  owner,
  users,
});
export const eventRedirectOn = () => ({
  type: EVENT_REDIRECT_ON,
});
export const eventRedirectOff = () => ({
  type: EVENT_REDIRECT_OFF,
});
export const getInfoEvent = () => ({
  type: GET_INFO_EVENT,
});
export const getDescriptions = (description, tech) => ({
  type: GET_DESCRIPTIONS,
  description,
  tech,
});
export const sendContent = (content) => ({
  type: HANDLE_CONTENT,
  content,
});
export const submitContent = () => ({
  type: SUBMIT_CONTENT,
});
export const clearInput = () => ({
  type: CLEAR_INPUT,
});
export const getMercure = () => ({
  type: GET_MERCURE,
});
export default reducer;
