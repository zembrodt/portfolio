import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MockComponent, MockProvider} from 'ng-mocks';
import {ElementRef, Renderer2} from '@angular/core';
import {TimelineComponent} from './timeline.component';
import {TimelineEntryComponent} from './timeline-entry/timeline-entry.component';
import {TimelineDividerComponent} from './timeline-divider/timeline-divider.component';
import {MatDialog} from '@angular/material/dialog';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimelineComponent,
        MockComponent(TimelineEntryComponent),
        MockComponent(TimelineDividerComponent)
      ],
      providers: [
        MockProvider(ElementRef),
        MockProvider(Renderer2),
        MockProvider(MatDialog)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
