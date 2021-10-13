import { TestBed } from '@angular/core/testing';

import { UseraccessGuard } from './useraccess.guard';

describe('UseraccessGuard', () => {
  let guard: UseraccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UseraccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
