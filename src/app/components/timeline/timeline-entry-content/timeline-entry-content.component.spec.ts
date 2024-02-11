import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MockProvider} from 'ng-mocks';
import {ElementRef} from '@angular/core';
import {TimelineEntryContentComponent} from './timeline-entry-content.component';

describe('TimelineEntryContentComponent', () => {
  let component: TimelineEntryContentComponent;
  let fixture: ComponentFixture<TimelineEntryContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineEntryContentComponent ],
      providers: [ MockProvider(ElementRef) ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineEntryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
