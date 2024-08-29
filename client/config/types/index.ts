export type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = LoginCredentials & {
  displayName?: string;
};
