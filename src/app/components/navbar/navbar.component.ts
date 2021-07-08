import {AfterViewInit, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {SettingsState} from '../../core/settings/settings.state';
import {Select, Store} from '@ngxs/store';
import {takeUntil} from 'rxjs/operators';
import {DARK_THEME, LIGHT_THEME} from '../../core/settings/settings.model';
import {ToggleTheme} from '../../core/settings/settings.actions';
import {ScreenState} from '../../core/screen/screen.state';

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
  private ngUnsubscribe = new Subject();
  private currentTheme: string;
  private previousOffsetY = 0;
  private previousPage: string;
  private previousWindowWidth: number;
  private previousWindowHeight: number;
  private currentPage = new Subject<string>();

  @Select(ScreenState.isLtMd) isLtMd$: Observable<boolean>;
  @Select(SettingsState.theme) theme$: Observable<string>;

  constructor(private store: Store) { }

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
    const targetEl = document.querySelector(pageId) as HTMLElement;
    const navbarHeight = (document.querySelector('#navbar') as HTMLElement).clientHeight;
    // Scroll directly to element if going down, scroll up with offset for navbar if scrolling up
    window.scrollTo(0, targetEl.offsetTop > window.pageYOffset ?
      targetEl.offsetTop - NAVIGATION_PADDING :
      targetEl.offsetTop - navbarHeight - NAVIGATION_PADDING);
  }

  onThemeChange(): void {
    this.store.dispatch(new ToggleTheme());
  }

  getThemeIcon(): string {
    switch (this.currentTheme) {
      case DARK_THEME:
        return 'dark_mode';
      case LIGHT_THEME:
        return 'light_mode';
      default:
        console.error('Invalid theme value: ' + this.currentTheme);
        return 'error_outline';
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const navEl = document.querySelector('#navbar') as HTMLElement;
    if (this.previousOffsetY > window.pageYOffset) {
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
    this.previousOffsetY = window.pageYOffset;
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.findPage();
  }

  private findPage(): void {
    // "line" across the screen used to determine which "page" the user is viewing
    const pageSelector = Math.floor((window.innerHeight / 3) + window.pageYOffset);
    let foundPage = false;
    for (const page of navMap.keys()) {
      const pageEl = document.querySelector(page) as HTMLElement;
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
    const navUnderlineEl = document.querySelector('#nav-underline') as HTMLElement;
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
          const navLinkEl = document.querySelector(navMap.get(pageId)) as HTMLElement;
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
          const navLinkEl = document.querySelector(navMap.get(pageId)) as HTMLElement;
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
