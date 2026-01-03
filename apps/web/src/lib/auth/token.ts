const ACCESS_TOKEN_KEY = 'access_token';

export const setAccessToken = (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token);

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);