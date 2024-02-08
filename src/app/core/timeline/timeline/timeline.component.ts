import {
  AfterContentInit, AfterViewChecked,
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
import {TimelineDialog} from './timeline.dialog';
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';

const DIALOG_ID = 'portfolio-zembrodt-dialog-id';
const NAVBAR_PADDING = 12;
const ENTRY_DELAY = 350;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy {

  private subscriptions: Subscription[] = [];
  private prevInTimeline = null;
  private selectedEntry: TimelineEntryComponent;
  private animationExecuted = false;
  private changedFromMobile = false;

  @ContentChildren(TimelineEntryComponent) entries: QueryList<TimelineEntryComponent>;
  @ContentChildren(TimelineDividerComponent) dividers: QueryList<TimelineDividerComponent>;

  @Input() isMobile = false;
  @Input() alternateEntries = true;
  @Input() nodeColor: string;
  @Input() enableAnimations = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2,
              private dialog: MatDialog) {}

  ngAfterContentInit(): void {
    // Subscribe to all timeline entry methods
    this.entries.toArray().forEach((timelineEntry, i) => {
      timelineEntry.enableAnimations = this.enableAnimations;
      // Subscribe timeline-entry to events
      this.subscriptions.push(timelineEntry.toggled.subscribe(event => {
        this.updateContentInfo(timelineEntry);
      }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isMobile) {
      this.changedFromMobile = !changes.isMobile.currentValue;
      // Move timeline according to mobile or desktop view
      this.renderer.setStyle(this.elementRef.nativeElement
        .querySelector('.timeline-line'), 'left', changes.isMobile.currentValue ? '50%' : '20%');
    }

    if (changes.alternateEntries) {
      this.updateTimelineEntries();
    }
  }

  ngAfterViewInit(): void {
    // Position the timeline content div correctly
    // this.updateTimelineContent();
    this.updateTimelineEntries();

    if (this.dividers) {
      this.dividers.forEach(divider => {
        if (this.nodeColor) {
          divider.node.color = this.nodeColor;
        }
      });
    }

    // Set default selected entry
    if (this.entries && this.entries.length > 0 && !this.isMobile) {
      this.updateContentInfo(this.entries.get(0));
    }
  }

  ngAfterViewChecked(): void {
    // Update the sticky content div if we just changed from mobile
    if (this.changedFromMobile) {
      this.changedFromMobile = false;
      // Check if an entry was ever selected
      if (!this.selectedEntry) {
        this.selectedEntry = this.entries.get(0);
      }
      // Set the selected entry back to null to "re-select" it
      const entry = this.selectedEntry;
      this.selectedEntry = null;
      this.updateContentInfo(entry);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    const dialogRef = this.dialog.getDialogById(DIALOG_ID);
    if (dialogRef) {
      dialogRef.close();
    }
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

  forceUpdateContent(): void {
    if (!this.isMobile) {
      const entry = this.selectedEntry;
      this.selectedEntry = null;
      this.updateContentInfo(entry);
    }
  }

  getSelectedEntryIndex(): number {
    if (this.selectedEntry) {
      return this.selectedEntry.indexId;
    }
    return null;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.updateContentStickyDiv();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    // reset the timeline content location
    this.prevInTimeline = null;
    this.updateContentStickyDiv();
  }

  // Updates positioning for the timeline entries
  private updateTimelineEntries(): void {
    // Set timeline line in middle of mobile or fixed screen
    let leftValue = this.isMobile ? 50 : 20;
    // If not alternating, move timeline to far right
    if (!this.alternateEntries) {
      leftValue *= 2;
    }
    this.renderer.setStyle(this.elementRef.nativeElement
      .querySelector('.timeline-line'), 'left', `${leftValue}%`);

    if (this.entries) {
      this.entries.forEach((entry, index) => {
        entry.enableAlternating = this.alternateEntries;
        entry.alternate = this.alternateEntries && index % 2 !== 0;
      });
    }
    if (this.dividers) {
      this.dividers.forEach((divider) => {
        divider.enableAlternating = this.alternateEntries;
      });
    }
  }

  // Updates the content info
  private updateContentInfo(entry: TimelineEntryComponent): void {
    // Check previous entry was not selected or allow it if mobile
    if ((this.selectedEntry && this.selectedEntry !== entry) || this.isMobile) {
      // Set the previous entry as not selected (if it's a different entry on mobile)
      if (this.selectedEntry && this.selectedEntry !== entry) {
        this.selectedEntry.node.selected = false;
      }

      // Check if in mobile mode or not
      if (!this.isMobile) {
        // Update content sticky div and animate
        const contentEl = document.querySelector('.timeline-content') as HTMLElement;
        if (contentEl) {
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
        }
      } else {
        // Display dialog of content if mobile mode
        const dialogRef = this.dialog.open(TimelineDialog, {id: DIALOG_ID});
        dialogRef.componentInstance.elementRef.nativeElement
          .querySelector('#timeline-dialog-content').innerHTML = entry.content.elementRef.nativeElement.innerHTML;
      }
    }
    // Set initial content if nothing selected
    else if (!this.selectedEntry && !this.isMobile) {
      // Change content, no animation
      const contentEl = document.querySelector('.timeline-content') as HTMLElement;
      if (contentEl) {
        contentEl.innerHTML = entry.content.elementRef.nativeElement.innerHTML;
      }
      // Set the node as selected since we aren't toggling
      entry.node.selected = true;
    }
    this.selectedEntry = entry;
  }

  // Updates the timeline content div to be sticky whilst scrolling past the timeline
  private updateContentStickyDiv(): void {
    // Only need to do if not in mobile mode
    if (!this.isMobile) {
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
