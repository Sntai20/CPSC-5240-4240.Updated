import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TutorialListsComponent } from './tutorial-lists/tutorial-lists.component';
import { TutorialDetailsComponent } from './tutorial-details/tutorial-details.component';
import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TutorialProxyService } from './tutorial-proxy.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TutorialListsComponent,
    TutorialDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ TutorialProxyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
