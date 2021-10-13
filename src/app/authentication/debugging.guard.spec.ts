import { TestBed } from '@angular/core/testing';

import { DebuggingGuard } from './debugging.guard';

describe('DebuggingGuard', () => {
  let guard: DebuggingGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DebuggingGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
