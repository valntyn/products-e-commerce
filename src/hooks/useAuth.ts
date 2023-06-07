import { useAppSelector } from './useAppSelector';

export const useAuth = () => {
  const { user, isLoading } = useAppSelector(state => state.auth);

  const {
    email,
    refreshToken,
    photoURL,
    phoneNumber,
    displayName,
    providerData = [],
  } = user || {};

  const { email: altEmail, providerId } = providerData[0] || {};

  return {
    isAuth: !!user?.displayName,
    email,
    refreshToken,
    photoURL,
    phoneNumber,
    displayName,
    isLoading,
    altEmail,
    providerId,
  };
};
