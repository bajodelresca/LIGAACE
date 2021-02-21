import { TestBed } from '@angular/core/testing';

import { PlayerfService } from './playerf.service';

describe('PlayerfService', () => {
  let service: PlayerfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
