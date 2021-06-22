import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ExperienceDetailComponent } from './components/experience-detail/experience-detail.component';
import { ContactComponent } from './components/contact/contact.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {SettingsState} from './core/settings/settings.state';
import {RedirectGuard} from './core/redirect/redirect.guard';
import {AppRoutingModule} from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SkillsComponent } from './components/skills/skills.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRippleModule} from '@angular/material/core';
import {VisibilityComponent} from './components/visibility/visibility.component';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {VisibleService} from './services/visible/visible.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    DashboardComponent,
    ExperienceComponent,
    ExperienceDetailComponent,
    FooterComponent,
    NavbarComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    SkillsComponent,
    VisibilityComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatRippleModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule,
        NgxsModule.forRoot(
          [SettingsState],
          {developmentMode: !environment.production}
        ),
        NgxsStoragePluginModule.forRoot({
          key: ['ZEMBRODT_PORTFOLIO_SETTINGS']
        }),
        NgxsReduxDevtoolsPluginModule.forRoot({
          disabled: environment.production
        })
    ],
  providers: [
    VisibleService,
    RedirectGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
