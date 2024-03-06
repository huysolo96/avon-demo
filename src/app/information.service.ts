import { Injectable, signal } from '@angular/core';
import { uniqueId } from 'lodash';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';


export type FormBasicOption = {
  question: string;
  required: boolean;
  allowSpecificUser: boolean;
  id: string;
}

export type FormOption = FormBasicOption & (
  {
    answer: NzCheckBoxOptionInterface[];
    type: "checkbox";
    otherAnswer?: string;
  } | {
    answer: string;
    type: "text"
  }
);
 
@Injectable({
  providedIn: 'root'
})
export class InformationService {
  questionForm =  signal<FormOption[]>([
    {
      question: "Please tell us about yourself",
      required: true,
      allowSpecificUser: true,
      type: "text",
      answer: "",
      id: uniqueId()
    },
    {
      question: "Please select the language you know",
      required: true,
      allowSpecificUser: true,
      type: "checkbox",
      answer: [
        { label: 'Typescript', value: 'Typescript', },
        { label: 'Python', value: 'Python' },
        { label: 'C#', value: 'C#' },
      ],
      id: uniqueId()

    }
  ])
  constructor() { }

}
