import { Routes } from '@angular/router';
import { InfomationCollectComponent } from './pages/infomation-collect/infomation-collect.component';
import { AnswerComponent } from './pages/answer/answer.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'form/builder',
        pathMatch: 'full'
    
    },
    {
        path: 'form',
        children: [
            {
                path: 'builder',
                component: InfomationCollectComponent
            },
            {
                path: 'answer',
                component: AnswerComponent
            }
        ]
    }
];
