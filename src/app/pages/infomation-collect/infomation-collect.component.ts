import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SelfIntroductionFormComponent } from '../../components/self-introduction-form/self-introduction-form.component';

@Component({
  selector: 'app-infomation-collect',
  standalone: true,
  imports: [
    CommonModule,
    SelfIntroductionFormComponent
  ],
  template: `<app-self-introduction-form /> `,
  styleUrl: './infomation-collect.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfomationCollectComponent { }
