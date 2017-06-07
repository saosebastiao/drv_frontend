import { createSelector } from 'reselect';

export const profile$ = (state: any) => state.profile;
export const profileSelector = createSelector(profile$, (profile: any) => ({
  profile
}));
