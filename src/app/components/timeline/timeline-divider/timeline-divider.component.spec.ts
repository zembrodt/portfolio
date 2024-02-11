import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TimelineDividerComponent} from './timeline-divider.component';
import {MockComponent, MockProvider} from 'ng-mocks';
import {ElementRef, Renderer2} from '@angular/core';
import {TimelineNodeComponent} from '../timeline-node/timeline-node.component';

describe('TimelineDividerComponent', () => {
  let component: TimelineDividerComponent;
  let fixture: ComponentFixture<TimelineDividerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimelineDividerComponent,
        MockComponent(TimelineNodeComponent)
      ],
      providers: [
        MockProvider(ElementRef),
        MockProvider(Renderer2)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
