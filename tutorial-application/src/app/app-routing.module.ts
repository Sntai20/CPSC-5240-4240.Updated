import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TutorialListsComponent } from './tutorial-lists/tutorial-lists.component';
import { TutorialDetailsComponent } from './tutorial-details/tutorial-details.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'tutorials', component: TutorialListsComponent },
  { path: 'tutorials/:id', component: TutorialDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
