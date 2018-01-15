export class Administrator {
  id: number;
  parent_id?: null;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  source?: null;
  pivot: Pivot;
  change_password?: boolean;
  rePassword?: string;
  password?: string;
  roles?: (RolesEntity)[] | null;
}

export interface Pivot {
  role_id: number;
  user_id: number;
}

export interface RolesEntity {
  id: number;
  name: string;
  display_name: string;
  description: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}
