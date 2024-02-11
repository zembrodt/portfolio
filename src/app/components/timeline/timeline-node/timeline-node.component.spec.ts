import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {TimelineNodeComponent} from './timeline-node.component';
import {MockProvider} from 'ng-mocks';
import {ElementRef, Renderer2} from '@angular/core';

describe('TimelineNodeComponent', () => {
  let component: TimelineNodeComponent;
  let fixture: ComponentFixture<TimelineNodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineNodeComponent ],
      providers: [
        MockProvider(ElementRef),
        MockProvider(Renderer2)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
