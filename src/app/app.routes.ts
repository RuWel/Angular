import { Routes } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';
import { TutorialListComponent } from './tutorial/tutoriallist.component';
import { FindTutorialComponent } from './tutorial/findtutorial/findtutorial.component';
import { CreateOrEditTutorialComponent } from './tutorial/posttutorial/createoredittutorial.component';

export const routes: Routes = [
    {path: 'tutorial', component: TutorialComponent},
    {path: 'details', component: TutorialListComponent},
    {path: 'find', title: 'FindTutorial', component: FindTutorialComponent},
    {path: 'create', component: CreateOrEditTutorialComponent},
    {path: 'create/:id', title: 'EditTutorial', component: CreateOrEditTutorialComponent}
];
