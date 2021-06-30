import {
  AfterContentInit,
  AfterViewInit,
  Component, ComponentFactoryResolver, ComponentRef,
  ContentChildren,
  ElementRef,
  HostListener, Input, OnChanges,
  OnDestroy,
  QueryList, SimpleChanges, ViewChild, ViewContainerRef
} from '@angular/core';
import {TimelineEntryComponent} from '../timeline-entry/timeline-entry.component';
import {Subscription} from 'rxjs';
import {TimelineNodeComponent} from '../timeline-node/timeline-node.component';
import {TimelineDividerComponent} from '../timeline-divider/timeline-divider.component';

const DEFAULT_NODE_PADDING = 40;

const NAVBAR_PADDING = 12;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnChanges, AfterContentInit, AfterViewInit, OnDestroy {

  // @ViewChild(TimelineDirective, {static: true}) timelineNodes!: TimelineDirective;

  private subscriptions: Subscription[] = [];
  private prevInTimeline = null;
  private startDate: number;
  private endDate: number;
  private displayDates: number[];
  private nodeRefs: ComponentRef<TimelineNodeComponent>[] = [];

  // @ViewChild('timelineNodes', {read: ViewContainerRef}) timelineNodesContainer: ViewContainerRef;
  @ContentChildren(TimelineEntryComponent) entries: QueryList<TimelineEntryComponent>;
  @ContentChildren(TimelineDividerComponent) dividers: QueryList<TimelineDividerComponent>;

  @Input() nodeColor: string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngAfterContentInit(): void {
    // Subscribe to all timeline entry methods
    const contentEl = document.querySelector('.timeline-content') as HTMLElement;
    const currentDate = new Date().getFullYear();
    const startDates = [];
    const endDates = [];
    const dates = new Set<number>();
    this.entries.toArray().forEach((timelineEntry, i) => {
      // Subscribe timeline-entry to events
      this.subscriptions.push(timelineEntry.toggled.subscribe(event => {
        if (contentEl) {
          contentEl.innerHTML = timelineEntry.content.elementRef.nativeElement.innerHTML;
        }
      }));

      // Set date values
      /*if (timelineEntry.start !== null && timelineEntry.start !== undefined) {
        startDates.push(timelineEntry.start);
        dates.add(timelineEntry.start);
      }
      let endDate = timelineEntry.end;
      if (endDate === null) {
        endDate = currentDate;
      }
      endDates.push(endDate);
      dates.add(endDate);*/
    });
    this.startDate = Math.min(...startDates);
    this.endDate = Math.max(...endDates);
    this.displayDates = Array.from(dates).sort();

    console.log('Start date:    ' + this.startDate);
    console.log('End date:      ' + this.endDate);
    console.log('Display dates: ' + this.displayDates);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTimelineContent2();
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

    // Position the timeline date labels
    /*const nodeComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TimelineNodeComponent);
    const viewContainerRef = this.timelineNodes.viewContainerRef;
    this.displayDates.forEach((date, i) => {
      // Create timeline nodes for each date
      const nodeComponentRef = viewContainerRef.createComponent<TimelineNodeComponent>(nodeComponentFactory);
      nodeComponentRef.instance.value = date;
      nodeComponentRef.instance.offset = i * 40;
      this.nodeRefs.push(nodeComponentRef);
    });*/

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
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
