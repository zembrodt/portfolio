import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MockComponent, MockProvider} from 'ng-mocks';
import {ElementRef, Renderer2} from '@angular/core';
import {TimelineNodeComponent} from '../timeline-node/timeline-node.component';
import {TimelineEntryComponent} from './timeline-entry.component';
import {TimelineEntryHeaderComponent} from '../timeline-entry-header/timeline-entry-header.component';
import {TimelineEntryContentComponent} from '../timeline-entry-content/timeline-entry-content.component';

describe('TimelineEntryComponent', () => {
  let component: TimelineEntryComponent;
  let fixture: ComponentFixture<TimelineEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimelineEntryComponent,
        MockComponent(TimelineEntryContentComponent),
        MockComponent(TimelineEntryHeaderComponent),
        MockComponent(TimelineNodeComponent)
      ],
      providers: [
        MockProvider(ElementRef),
        MockProvider(Renderer2)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
