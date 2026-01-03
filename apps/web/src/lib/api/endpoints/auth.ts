import api from "../apiClient";

type SignInRequest = {
  username: string;
  password: string;
};
type SignInResponse = {
  access_token: string;
};

export const authApi = {
  signIn: (body: SignInRequest): Promise<SignInResponse> => api.post('/auth/sign-in', body),
}