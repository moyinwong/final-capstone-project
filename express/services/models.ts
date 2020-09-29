export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  image: string;
  is_tutor: boolean;
  title: string;
  introduction: string;
  linkedin: string;
  google_id: string;
  facebook_id: string;
}

export interface ICategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ICourse {
  name: string;
  price: number;
  category_id: number;
  subcategory_id?: number;
  tutor_id: number;
  image: string;
  description: string;
  objective: string;
  prerequisites: string;
}

//in order to add "user" in Request
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        image: string;
        is_tutor: boolean;
        title: string;
        introduction: string;
        linkedin: string;
        google_id: string;
        facebook_id: string;
      };
    }
  }
}

export interface IUserCourse {
  category_id: number;
  course_id: number;
  course_image: string;
  course_name: string;
  description: string;
  objective: string;
  prerequisites: string;
  subcategory_id: null | number;
  tutor_email: string;
  tutor_introduction: string;
  tutor_name: string;
  tutor_title: string; 
}