import { TestBed } from '@angular/core/testing';

import { GamefService } from './gamef.service';

describe('GamefService', () => {
  let service: GamefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
