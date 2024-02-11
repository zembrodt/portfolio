/* tslint:disable:no-string-literal */

import {TestBed} from '@angular/core/testing';
import {VisibleService} from './visible.service';

describe('VisibleService', () => {
  let service: VisibleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisibleService);

    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should return non-null observable from isVisible', () => {
    expect(service.isVisible('test-page')).toBeTruthy();
  });

  it(`should initially set a page's visibility as false`, () => {
    service.isVisible('test-page');
    expect(service['pages'].get('test-page').isVisible).toBeFalse();
  });

  it('should set visibility to true when initially toggled', () => {
    service.toggleVisible('test-page');
    expect(service['pages'].get('test-page').isVisible).toBeTrue();
  });

  it('should emit visibility as true when toggled', () => {
    service.isVisible('test-page').subscribe((isVisible) => {
      expect(isVisible).toBeTrue();
    });
    service.toggleVisible('test-page');
    jasmine.clock().tick(1);
  });
});
