import { Sys } from "./sys.model";

export interface Entry<T> {
   sys: Sys;
   fields: T;
}