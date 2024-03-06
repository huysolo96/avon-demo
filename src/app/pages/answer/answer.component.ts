import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InformationService } from '../../information.service';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    RouterModule
  ],
  template: `<div nz-row>
    @for (item of informationService.questionForm(); track $index) {
       <b nz-col [nzSpan]="24">
        {{ item.question }}
       </b>
       @switch (item.type) {
        @case ("text") {
          <div nz-col [nzSpan]="24">
            {{ item.answer }}
          </div>
        }
        @case ("checkbox") {
          @for (answer of item.answer; track $index) {
            @if (answer.checked) {
              <div nz-col [nzSpan]="24">
                {{ answer.value }}
              </div>
            }
          }
        }
       }
    }
    <a class="builder-link" [routerLink]="['form', 'builder']">Go back to builder</a>
  </div>`,
  styleUrl: './answer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerComponent {
  constructor(protected informationService: InformationService) {}
  
}
