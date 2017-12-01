export class User {
  id: number;
  parent_id?: any;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  source?: any;
  roles: Role[];
}
export class Pivot {
  user_id: number;
  role_id: number;
}

export class Role {
  id: number;
  name: string;
  display_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}
