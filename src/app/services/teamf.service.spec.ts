import { TestBed } from '@angular/core/testing';

import { TeamfService } from './teamf.service';

describe('TeamfService', () => {
  let service: TeamfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
