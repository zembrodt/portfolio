import {AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SettingsState} from '../../core/settings/settings.state';
import {Store} from '@ngxs/store';
import {takeUntil} from 'rxjs/operators';
import {ToggleTheme} from '../../core/settings/settings.actions';
import {ScreenState} from '../../core/screen/screen.state';
import {Router} from '@angular/router';
import {Theme} from '../../core/settings/settings.model';
import {DOCUMENT} from '@angular/common';

const NAVBAR_ANIMATE_DURATION = 1000;
const NAVIGATION_PADDING = 12;
const navMap = new Map<string, string>();
navMap.set('#intro', '');
navMap.set('#experience-timeline', '#nav-experience');
navMap.set('#skills', '#nav-skills');
navMap.set('#projects', '#nav-projects');
navMap.set('#about', '#nav-about');


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();
  private currentTheme: string;
  private previousOffsetY = 0;
  private previousPage: string;
  private previousWindowWidth: number;
  private previousWindowHeight: number;
  private currentPage = new Subject<string>();

  isLtMd$: Observable<boolean>;
  theme$: Observable<string>;

  constructor(private store: Store, private router: Router, @Inject(DOCUMENT) private document: Document) {
    this.isLtMd$ = this.store.select(ScreenState.isLtMd);
    this.theme$ = this.store.select(SettingsState.theme);
  }

  ngOnInit(): void {
    this.theme$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((theme) => this.currentTheme = theme);

    this.currentPage
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((pageId: string) => {
        this.updateNavUnderline(pageId);
    });
  }

  ngAfterViewInit(): void {
    this.previousWindowWidth = window.innerWidth;
    this.previousWindowHeight = window.innerHeight;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.currentPage.complete();
  }

  navigate(pageId: string): void {
    const routeSplit = this.router.url.split('#');
    let route: string = null;
    if (routeSplit.length > 0) {
      route = routeSplit[0];
    }

    // Check if we are on the dashboard or not
    if (route && route.length > 0 && route !== '/') {
      this.router.navigateByUrl('/' + pageId);
    } else {
      const targetEl = this.document.querySelector(pageId) as HTMLElement;
      const navbarHeight = (this.document.querySelector('#navbar') as HTMLElement).clientHeight;
      // Scroll directly to element if going down, scroll up with offset for navbar if scrolling up
      window.scrollTo(0, targetEl.offsetTop > window.scrollY ?
        targetEl.offsetTop - NAVIGATION_PADDING :
        targetEl.offsetTop - navbarHeight - NAVIGATION_PADDING);
    }
  }

  onThemeChange(): void {
    this.store.dispatch(new ToggleTheme());
  }

  getThemeIcon(): string {
    switch (this.currentTheme) {
      case Theme.Dark:
        return 'dark_mode';
      case Theme.Light:
        return 'light_mode';
      default:
        console.error('Invalid theme value: ' + this.currentTheme);
        return 'error_outline';
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const navEl = this.document.querySelector('#navbar') as HTMLElement;
    if (this.previousOffsetY > window.scrollY) {
      // Scrolling up
      navEl.animate({
        transform: 'translateY(0%)'
      }, {
        duration: NAVBAR_ANIMATE_DURATION,
        fill: 'forwards'
      });
    } else {
      // Scrolling down
      navEl.animate({
        transform: 'translateY(-110%)'
      }, {
        duration: NAVBAR_ANIMATE_DURATION,
        fill: 'forwards'
      });
    }
    // Find closest "page" to the center
    this.findPage();
    this.previousOffsetY = window.scrollY;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.findPage();
  }

  private findPage(): void {
    // "line" across the screen used to determine which "page" the user is viewing
    const pageSelector = Math.floor((window.innerHeight / 3) + window.scrollY);
    let foundPage = false;
    for (const page of navMap.keys()) {
      const pageEl = this.document.querySelector(page) as HTMLElement;
      if (pageEl && pageSelector >= pageEl.offsetTop && pageSelector < pageEl.offsetTop + pageEl.clientHeight) {
        this.currentPage.next(page);
        foundPage = true;
        break;
      }
    }
    // If we didn't find a matching page but the window was resized
    if (this.previousPage && !foundPage &&
      (this.previousWindowWidth !== window.innerWidth || this.previousWindowHeight !== window.innerHeight)
    ) {
      // Move the nav underline to the previous page
      this.currentPage.next(this.previousPage);
    }
  }

  private updateNavUnderline(pageId: string): void {
    const navUnderlineEl = this.document.querySelector('#nav-underline') as HTMLElement;
    if (navUnderlineEl) {
      // Check if window was resized or page changed
      if (window.innerWidth !== this.previousWindowWidth || window.innerHeight !== this.previousWindowHeight ||
        (pageId && pageId.length > 0 && pageId !== this.previousPage)
      ) {
        // Blur out if going to intro state
        if (pageId === '#intro') {
          // Get previous element
          navUnderlineEl.animate({
            opacity: 0
          }, {
            duration: 1000,
            fill: 'forwards',
            easing: 'ease-out'
          });
        }
        // Blur in if previous was intro
        else if (!this.previousPage || this.previousPage.length === 0 || this.previousPage === '#intro') {
          const navLinkEl = this.document.querySelector(navMap.get(pageId)) as HTMLElement;
          navUnderlineEl.style.left = String(navLinkEl.offsetLeft) + 'px';
          navUnderlineEl.style.top = String(navLinkEl.offsetTop + navLinkEl.clientHeight) + 'px';
          navUnderlineEl.style.width = String(navLinkEl.clientWidth) + 'px';

          navUnderlineEl.animate({
            opacity: 1
          }, {
            duration: NAVBAR_ANIMATE_DURATION,
            fill: 'forwards',
            easing: 'ease-in'
          });
        } else {
          const navLinkEl = this.document.querySelector(navMap.get(pageId)) as HTMLElement;
          navUnderlineEl.animate({
            opacity: 1,
            left: String(navLinkEl.offsetLeft) + 'px',
            top: String(navLinkEl.offsetTop + navLinkEl.clientHeight) + 'px',
            width: String(navLinkEl.clientWidth) + 'px'
          }, {
            duration: NAVBAR_ANIMATE_DURATION,
            fill: 'forwards',
          });
        }
        this.previousPage = pageId;
        this.previousWindowWidth = window.innerWidth;
        this.previousWindowHeight = window.innerHeight;
      }
    }
  }
}
