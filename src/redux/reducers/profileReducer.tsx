import ProfileActions from '../actions/ProfileActions';
import defaultState from './defaultState';

export const profile = (state: any = defaultState.profile, action: any) => {
  switch (action.type) {
    case ProfileActions.UPDATE_PROFILE:
      return { ...action.payload };
    default:
      return state;
  }
};

