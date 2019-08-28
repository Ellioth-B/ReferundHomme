import { TestBed } from '@angular/core/testing';

import { SondageService } from './sondage.service';

describe('SondageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SondageService = TestBed.get(SondageService);
    expect(service).toBeTruthy();
  });
});
