export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  photo?: string;
  managerId?: number;
  reports?: User[];
}