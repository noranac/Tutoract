// reducer pour gérer les données relatives à l'utilisateur

// --- initial state
const initialState = {
  id: null,
  city: '',
  nickname: '',
  firstname: '',
  promo: '',
  lastname: '',
  avatar: '',
  linkedin_account: '',
  twitter_account: '',
  github_account: '',
  roles: [],
  techs: [],
  events: [],
  logged: false,
};

// --- action types
const LOG_USER = 'LOG_USER';
const IS_LOGGED = 'IS_LOGGED';
const IS_UNLOGGED = 'IS_UNLOGGGED';
export const GET_USER_INFOS = 'GET_USER_INFOS';


// --- Reducer
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOG_USER:
      return {
        ...state,
        id: action.id,
        firstname: action.firstname,
        lastname: action.lastname,
        roles: action.roles,
        promo: action.promo,
        techs: action.techs,
        nickname: action.nickname,
        avatar: action.avatar,
        city: action.city,
        events: action.events,
        eventsOwned: action.eventsOwned,
        github_account: action.github_account,
        linkedin_account: action.linkedin_account,
        twitter_account: action.twitter_account,
      };
    case IS_LOGGED:
      return {
        ...state,
        logged: true,
      };
    case IS_UNLOGGED:
      return {
        ...state,
        logged: false,
      };
    default: return state;
  }
};

// --- action creators
export const logUser = (
  id,
  avatar,
  city,
  events,
  promo,
  eventsOwned,
  firstname,
  github_account,
  lastname,
  linkedin_account,
  nickname,
  roles,
  techs,
  twitter_account,
) => ({
  type: LOG_USER,
  id,
  avatar,
  city,
  promo,
  events,
  eventsOwned,
  firstname,
  github_account,
  lastname,
  linkedin_account,
  nickname,
  roles,
  techs,
  twitter_account,
});

export const getUserInfos = () => ({
  type: GET_USER_INFOS,
});
export const loggedUser = () => ({
  type: IS_LOGGED,
});
export const unloggedUser = () => ({
  type: IS_UNLOGGED,
});

// --- export
export default reducer;
