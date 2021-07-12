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
import {VisibilityComponent} from './core/visibility/visibility.component';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {VisibleService} from './services/visible/visible.service';
import {TimelineComponent} from './core/timeline/timeline/timeline.component';
import {TimelineEntryComponent} from './core/timeline/timeline-entry/timeline-entry.component';
import {TimelineEntryContentComponent} from './core/timeline/timeline-entry-content/timeline-entry-content.component';
import {TimelineEntryHeaderComponent} from './core/timeline/timeline-entry-header/timeline-entry-header.component';
import {TimelineNodeComponent} from './core/timeline/timeline-node/timeline-node.component';
import {TimelineDividerComponent} from './core/timeline/timeline-divider/timeline-divider.component';
import {ScreenState} from './core/screen/screen.state';
import {MatMenuModule} from '@angular/material/menu';
import {TimelineDialog} from './core/timeline/timeline/timeline.dialog';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
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
    PageNotFoundComponent,
    ProjectsComponent,
    ProjectDetailComponent,
    SkillsComponent,
    TimelineComponent,
    TimelineDialog,
    TimelineDividerComponent,
    TimelineEntryComponent,
    TimelineEntryContentComponent,
    TimelineEntryHeaderComponent,
    TimelineNodeComponent,
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
    MatMenuModule,
    MatRippleModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    NgxsModule.forRoot(
      [SettingsState, ScreenState],
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
