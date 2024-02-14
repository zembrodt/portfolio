import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {MockProvider} from 'ng-mocks';
import {ElementRef} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TimelineDialog} from './timeline.dialog';

describe('TimelineDialog', () => {
  let component: TimelineDialog;
  let fixture: ComponentFixture<TimelineDialog>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineDialog ],
      imports: [ MatDialogModule ],
      providers: [
        MockProvider(ElementRef),
        MockProvider(MatDialogRef)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelineDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
