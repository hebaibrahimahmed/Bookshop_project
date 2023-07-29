export interface User {
  user_id: string;
  _id?: string;
  first_name: string;
  last_name: string;
  birth_date?: Date;
  email: string;
  address?: string;
  password: string;
  gender?: string;
  image_url?: string;
  is_admin?: boolean;
}
