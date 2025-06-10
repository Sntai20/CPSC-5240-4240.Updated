import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeLoginComponent } from './welcome-login/welcome-login.component';
import { TutorialListsComponent } from './tutorial-lists/tutorial-lists.component';
import { TutorialDetailsComponent } from './tutorial-details/tutorial-details.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';

const routes: Routes = [
  { path: '', component: WelcomeLoginComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'tutorials', component: TutorialListsComponent },
  {
    path: 'tutorials/:id', component: TutorialDetailsComponent,
    children: [
      {
        path: 'communityNotes/:noteId',
        component: TutorialDetailsComponent
      }
    ]
  },
  { path: 'affiliates', component: AffiliatesComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }