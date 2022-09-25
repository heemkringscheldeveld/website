export interface RichTextField {
   data: any;
   content: RichtTextFieldContent;
}

interface RichtTextFieldContent {
   data: any;
   content: RichtTextFieldContentContent;
}

interface RichtTextFieldContentContent {
   value: string;
   nodeType: string;
}