export interface PageResult<T> {
   items: Array<T>;
   limit: number;
   skip: number;
   total: number;
}