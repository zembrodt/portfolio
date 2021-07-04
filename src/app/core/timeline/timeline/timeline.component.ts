import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren, ElementRef,
  HostListener, Input, OnChanges,
  OnDestroy,
  QueryList, Renderer2, SimpleChanges,
} from '@angular/core';
import {TimelineEntryComponent} from '../timeline-entry/timeline-entry.component';
import {Subscription} from 'rxjs';
import {TimelineDividerComponent} from '../timeline-divider/timeline-divider.component';

const NAVBAR_PADDING = 12;
const ENTRY_DELAY = 350;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges, AfterContentInit, AfterViewInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private prevInTimeline = null;
  private selectedEntry: TimelineEntryComponent;
  private animationExecuted = false;

  @ContentChildren(TimelineEntryComponent) entries: QueryList<TimelineEntryComponent>;
  @ContentChildren(TimelineDividerComponent) dividers: QueryList<TimelineDividerComponent>;

  @Input() isMobile = false;
  @Input() nodeColor: string;
  @Input() enableAnimations = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    // Subscribe to all timeline entry methods
    this.entries.toArray().forEach((timelineEntry, i) => {
      timelineEntry.enableAnimations = this.enableAnimations;
      // Subscribe timeline-entry to events
      this.subscriptions.push(timelineEntry.toggled.subscribe(event => {
        this.updateContent(timelineEntry);
      }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTimelineContent2();
    if (changes.isMobile) {
      if (changes.isMobile.currentValue) {
        // Move timeline line to middle of page
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.timeline-line'), 'left', '50%');
      } else {
        this.updateContent(this.selectedEntry);
        this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.timeline-line'), 'left', '20%');
      }
    }
  }

  ngAfterViewInit(): void {
    // Position the timeline content div correctly
    // this.updateTimelineContent();
    this.updateTimelineContent2();

    if (this.dividers) {
      this.dividers.forEach(divider => {
        if (this.nodeColor) {
          divider.node.color = this.nodeColor;
        }
      });
    }

    // Set default selected entry
    if (this.entries && this.entries.length > 0) {
      this.updateContent(this.entries.get(0));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  startAnimation(): void {
    if (this.enableAnimations && !this.animationExecuted && this.entries) {
      this.entries.forEach((entry, i) => {
        setTimeout(() => {
          entry.animate(ENTRY_DELAY);
        }, ENTRY_DELAY * i);
      });
      this.animationExecuted = true;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateTimelineContent();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    // reset the timeline content location
    this.prevInTimeline = null;
    this.updateTimelineContent();
  }

  private updateContent(entry: TimelineEntryComponent): void {
    const contentEl = document.querySelector('.timeline-content') as HTMLElement;
    if (contentEl) {
      if (this.selectedEntry && this.selectedEntry !== entry) {
        this.selectedEntry.node.selected = false;
        // Animate the content change
        contentEl.animate([{
          opacity: 1,
          transform: 'translateX(0) rotateY(0)'
        }, {
          opacity: 1,
          transform: 'translateX(8%) rotateY(30deg)'
        }, {
          opacity: 0,
          transform: 'translateX(16%) rotateY(60deg)'
        }], {
          duration: 500,
          fill: 'forwards'
        }).finished.then(() => {
          contentEl.innerHTML = entry.content.elementRef.nativeElement.innerHTML;
          contentEl.animate([{
            opacity: 0,
            transform: 'translateX(-16%) rotateY(-60deg)'
          }, {
            opacity: 1,
            transform: 'translateX(-8%) rotateY(-30deg)'
          }, {
            opacity: 1,
            transform: 'translateX(0) rotateY(0)'
          }], {
            duration: 500,
            fill: 'forwards'
          });
        });
      } else {
        // Change content, no animation
        contentEl.innerHTML = entry.content.elementRef.nativeElement.innerHTML;
      }

      this.selectedEntry = entry;
    }
  }

  private updateTimelineContent2(): void {
    if (this.entries) {
      this.entries.forEach((entry, index) => {
        entry.alternate = index % 2 !== 0;
      });
    }
  }

  // Updates the timeline content div to be sticky whilst scrolling past the timeline
  private updateTimelineContent(): void {
    const contentEl = document.querySelector('.timeline-content') as HTMLElement;
    const offsetTop = (document.querySelector('#navbar') as HTMLElement).clientHeight + NAVBAR_PADDING;
    const placeholderEl = document.querySelector('.timeline-content-placeholder') as HTMLElement;

    if (this.inTimeline()) {
      if (this.prevInTimeline === null || !this.prevInTimeline) {
        contentEl.style.position = 'fixed';
        contentEl.style.top = offsetTop + 'px';
        contentEl.style.left = placeholderEl.getBoundingClientRect().left + 'px';
        contentEl.style.width = placeholderEl.clientWidth + 'px';
        this.prevInTimeline = true;
      }
    } else {
      if (this.prevInTimeline === null || this.prevInTimeline) {
        // Check if we scrolled below or above timeline
        if (placeholderEl.getBoundingClientRect().top >= 0) {
          contentEl.style.top = placeholderEl.offsetTop + 'px';
        } else {
          contentEl.style.top = (placeholderEl.offsetTop + placeholderEl.clientHeight - contentEl.clientHeight) + 'px';
        }
        contentEl.style.position = 'absolute';
        contentEl.style.left = placeholderEl.offsetLeft + 'px';
        this.prevInTimeline = false;
      }
    }
  }

  // Checks if the timeline is currently being scrolled through
  private inTimeline(): boolean {
    const contentHeight = (document.querySelector('.timeline-content') as HTMLElement).clientHeight;
    const placeholderEl = document.querySelector('.timeline-content-placeholder') as HTMLElement;
    const offsetTop = (document.querySelector('#navbar') as HTMLElement).clientHeight + NAVBAR_PADDING;

    return offsetTop >= placeholderEl.getBoundingClientRect().top &&
      contentHeight + offsetTop < placeholderEl.getBoundingClientRect().top + placeholderEl.clientHeight;
  }
}
