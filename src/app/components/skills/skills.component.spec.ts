import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { SkillsComponent } from './skills.component';
import {MockProvider} from 'ng-mocks';
import {VisibleService} from '../../services/visible.service';
import {MatCardModule} from '@angular/material/card';
import {of} from 'rxjs';
import {MatRippleModule} from '@angular/material/core';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let visibleService: VisibleService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsComponent ],
      imports: [
        MatCardModule,
        MatRippleModule
      ],
      providers: [
        MockProvider(VisibleService)
      ]
    }).compileComponents();
    visibleService = TestBed.inject(VisibleService);
    visibleService.isVisible = jasmine.createSpy().and.returnValue(of(false));

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
