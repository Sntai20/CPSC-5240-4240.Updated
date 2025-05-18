import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TutorialListComponent } from './tutorial-list/tutorial-list.component';
import { TutorialDetailComponent } from './tutorial-detail/tutorial-detail.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'tutorials', component: TutorialListComponent },
  { path: 'tutorials/:id', component: TutorialDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
