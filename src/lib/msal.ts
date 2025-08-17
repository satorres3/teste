import { UserProfile } from '../types/api';

export const signInWithGoogle = async (): Promise<UserProfile> => {
  return { name: 'Mock User', email: 'user@example.com' };
};

export const signInWithMicrosoft = async (): Promise<UserProfile> => {
  return { name: 'Mock User', email: 'user@example.com' };
};
