import { TestBed } from '@angular/core/testing';

import { ActualitesService } from './actualites.service';

describe('ActualitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActualitesService = TestBed.get(ActualitesService);
    expect(service).toBeTruthy();
  });
});
