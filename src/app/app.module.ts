import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './components/app/app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';
import {AboutComponent} from './components/about/about.component';
import {ExperienceComponent} from './components/experience/experience.component';
import {ExperienceDetailComponent} from './components/experience-detail/experience-detail.component';
import {ContactComponent} from './components/contact/contact.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment';
import {NgxsStoragePluginModule} from '@ngxs/storage-plugin';
import {SettingsState} from './core/settings/settings.state';
import {RedirectGuard} from './core/redirect/redirect.guard';
import {AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './components/navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {FooterComponent} from './components/footer/footer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SkillsComponent} from './components/skills/skills.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRippleModule} from '@angular/material/core';
import {VisibilityComponent} from './components/visibility/visibility.component';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {VisibleService} from './services/visible.service';
import {TimelineComponent} from './components/timeline/timeline.component';
import {TimelineEntryComponent} from './components/timeline/timeline-entry/timeline-entry.component';
import {TimelineEntryContentComponent} from './components/timeline/timeline-entry-content/timeline-entry-content.component';
import {TimelineEntryHeaderComponent} from './components/timeline/timeline-entry-header/timeline-entry-header.component';
import {TimelineNodeComponent} from './components/timeline/timeline-node/timeline-node.component';
import {TimelineDividerComponent} from './components/timeline/timeline-divider/timeline-divider.component';
import {ScreenState} from './core/screen/screen.state';
import {TimelineDialog} from './components/timeline/timeline.dialog';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MarkdownModule} from 'ngx-markdown';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';

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
    VisibilityComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
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
