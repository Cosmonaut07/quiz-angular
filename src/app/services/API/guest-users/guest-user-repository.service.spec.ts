import { TestBed } from '@angular/core/testing';

import { GuestUserRepositoryService } from './guest-user-repository.service';

describe('GuestUserRepositoryService', () => {
  let service: GuestUserRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestUserRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
