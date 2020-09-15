export interface IUser {
  id: number;
  email: string;
  password: string;
  image: string;
  isTutor: boolean;
  title: string;
  introduction: string;
  linkedin: string;
  googleId: string;
  facebookId: string;
}

// export interface {

// }

//in order to add "user" in Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        image: string;
        isTutor: boolean;
        title: string;
        introduction: string;
        linkedin: string;
        googleId: string;
        facebookId: string;
      };
    }
  }
}
