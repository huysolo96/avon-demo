import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, WritableSignal, computed, signal } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCheckboxModule, NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { uniqueId } from 'lodash';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormOption, InformationService } from '../../information.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-self-introduction-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzCheckboxModule,
    NzButtonModule,
    NzModalModule,
    NzSelectModule,
    NzInputModule
  ],
  template: ` <div nz-row [nzGutter]="[0, 8]">
                <div nz-form nz-col [nzSpan]="24">
                  @for (item of questionForm(); track item.id) {
                    <nz-form-item >
                      <nz-form-label [nzRequired]="item.required" [nzSpan]="24">{{ item.question }}</nz-form-label>
                      <nz-form-control [nzSpan]="24">
                        @switch (item.type) {
                          @case ("checkbox") {
                            <nz-checkbox-group  [(ngModel)]="item.answer" ></nz-checkbox-group>

                          }
                          @case ("text") {
                            <textarea [(ngModel)]="item.answer" nz-input  [rows]="5" [cols]="24"></textarea>
                          }
                        }
                      </nz-form-control>
                    </nz-form-item>
                  }

                  <button nz-button (click)="addNewQuestion()" color="primary">Add New Question</button>
                </div>
                <div nz-col [nzSpan]="24">
                  <button (click)="this.router.navigate(['form', 'answer'])" nz-button >Review my answer </button>

                </div>
              </div>
              <nz-modal [nzVisible]="!!newQuestionForm()" nzTitle="Add a new question"  >
                <ng-container *nzModalContent>
                  @if (newQuestionForm(); as newQuestionFormValue) {
                    <div nz-form>
                      <nz-form-item>
                        <nz-form-label [nzSpan]="24">Select question type</nz-form-label>
                        <nz-form-control [nzSpan]="24">
                          <nz-select nzPlaceHolder="Select question type" [ngModel]="newQuestionFormValue.type" (ngModelChange)="updateNewQuestionForm($event)">
                            <nz-option nzLabel="Checkbox" nzValue="checkbox">
                            </nz-option>
                            <nz-option nzLabel="Text" nzValue="text">
                            </nz-option>
                          </nz-select>
                        </nz-form-control>
                      </nz-form-item>
                      <nz-form-item>
                        <nz-form-label [nzSpan]="24">Type question here</nz-form-label>
                        <nz-form-control [nzSpan]="24">
                          <input nz-input [(ngModel)]="newQuestionFormValue.question" >
                        </nz-form-control>

                      </nz-form-item>
                      <nz-form-item>
                          
                        @switch (newQuestionFormValue.type) {
                          @case ("checkbox") {
                            <nz-form-label [nzSpan]="24">And answer option</nz-form-label>
                            <div nz-row [nzGutter]="[0, 8]" nz-col [nzSpan]="24">
                              @for(item of newQuestionFormValue.answer; track item) {
                                <div nz-col nzSpan="24">
                                  <nz-form-control [nzSpan]="24">
                                    <input nz-input [(ngModel)]="item.label" placeholder="And answer option">
                                  </nz-form-control>

                                </div>
                              }
                              <div nz-col nzSpan="24">
                                <button nz-button (click)="addNewCheckboxAnswer()">Add another answer</button>
                            </div>

                            </div>

                          }
                          @case ("text") {
                            <nz-form-label [nzSpan]="24">Type answer here</nz-form-label>
                            <nz-form-control>
                              <input nz-input [(ngModel)]="newQuestionFormValue.answer">
                            </nz-form-control>

                          }
                        }
                      </nz-form-item>
                      <nz-form-item >
                          <nz-form-control [nzSpan]="24">
                            <div nz-checkbox [nzValue]="true" [(nzChecked)]="newQuestionFormValue.allowSpecificUser">Allow user to specify their own answer</div>
                          </nz-form-control>
                      </nz-form-item>
                      <nz-form-item >
                          <nz-form-control [nzSpan]="24">
                            <div nz-checkbox [nzValue]="true" [(nzChecked)]="newQuestionFormValue.required">This field is required</div>
                          </nz-form-control>
                      </nz-form-item>
                      
                    </div>
                  }
                </ng-container>
                <ng-container  *nzModalFooter >
                  <button nz-button nzType="primary" type="submit" (click)="onSubmitnewQuestionSet()" >
                    Add 
                  </button>
                </ng-container>
              </nz-modal>
              `,
  styleUrl: './self-introduction-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelfIntroductionFormComponent {
  newQuestionForm = signal<FormOption | null>(null);
  questionForm =  this.informationService.questionForm;

  constructor(private informationService: InformationService, protected router: Router) {
    
  }
  onSubmitnewQuestionSet() {
    const newValue = this.newQuestionForm();
    
    if (newValue) {
      this.questionForm.update(v => [
        ...v,
        newValue
      ]);
      this.newQuestionForm.set(null);
      
    }

  }

  addNewCheckboxAnswer() {
    this.newQuestionForm.update((v: any) => v ? ({
      ...v,
      answer: v.type === "checkbox" ? [
        ...v.answer,
        {
          value: "",
          label: ""
        }
      ]: v.answer
    }) : null)
  }


  addNewDefaultText() {
    this.newQuestionForm.update(() => ({
      type: "text",
      required: false,
      allowSpecificUser: false,
      id: uniqueId(),
      answer: "",
      question: ""
    }))
  }

  addNewDefaultCheckbox() {
    this.newQuestionForm.update((v) => ({
      type: "checkbox",
      required: false,
      allowSpecificUser: false,
      id: uniqueId(),
      answer: [
        {
          value: "",
          label: ""
        }
      ],
      question: ""
    }))
  }

  updateNewQuestionForm(v: string) {
    switch (v) {
      case "checkbox":
        this.addNewDefaultCheckbox();
        break;
      case "text":
        this.addNewDefaultText();
        break;
      default:
        break;
    }
  }

  
  
  addNewQuestion() {
    this.addNewDefaultText()
  }

  
  
  

}
