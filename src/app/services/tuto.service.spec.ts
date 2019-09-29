import { TestBed } from '@angular/core/testing';

import { TutoService } from './tuto.service';

describe('TutoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TutoService = TestBed.get(TutoService);
    expect(service).toBeTruthy();
  });
});
