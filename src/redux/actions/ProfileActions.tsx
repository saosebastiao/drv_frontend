import { createAction } from 'redux-actions';

const UPDATE_PROFILE = 'UPDATE_PROFILE';
const updateProfile$ = createAction(UPDATE_PROFILE);
const updateProfile = (profile: any) =>
  (dispatch: any) => dispatch(updateProfile$(profile));
  
export default {
	UPDATE_PROFILE,
	updateProfile
}