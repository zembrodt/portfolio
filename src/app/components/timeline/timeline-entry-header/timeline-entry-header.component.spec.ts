import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TimelineEntryHeaderComponent} from './timeline-entry-header.component';

describe('TimelineEntryHeaderComponent', () => {
  let component: TimelineEntryHeaderComponent;
  let fixture: ComponentFixture<TimelineEntryHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineEntryHeaderComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineEntryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
