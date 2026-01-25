export type SessionUser = {
  id: number;
  role?: string;
};

export type SessionLike = {
  user?: SessionUser;
};