import { TestBed } from '@angular/core/testing';

import { Skills } from './skills';

describe('Skills', () => {
  let service: Skills;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Skills);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
