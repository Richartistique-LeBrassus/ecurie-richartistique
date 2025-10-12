export interface Category {
  _id?: string;                
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug?: { current: string };   
  description?: string;
}