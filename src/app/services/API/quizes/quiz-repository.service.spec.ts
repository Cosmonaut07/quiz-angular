import { TestBed } from '@angular/core/testing';

import { QuizRepositoryService } from './quiz-repository.service';

describe('QuizRepositoryService', () => {
  let service: QuizRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
