export interface IUser {
  id: number;
  username: string;
  password: string;
}

//in order to add "user" in Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        username: string;
      };
    }
  }
}
