import { RichTextField } from "../rich-text-field.model";

export interface Post {
   title: string;
   description: RichTextField;
   url: string;
   urlTitle: string;
}