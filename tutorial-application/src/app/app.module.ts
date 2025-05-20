import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TutorialListsComponent } from './tutorial-lists/tutorial-lists.component';
import { TutorialDetailsComponent } from './tutorial-details/tutorial-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TutorialProxyService } from './services/tutorial-proxy.service';
import { CommunityNoteProxyService }   from './services/community-note-proxy.service';
import { AffiliatesComponent } from './affiliates/affiliates.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TutorialListsComponent,
    TutorialDetailsComponent,
    AffiliatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule      
  ],
  providers: [ 
    TutorialProxyService,
    CommunityNoteProxyService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
