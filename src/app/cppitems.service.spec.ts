import { TestBed } from '@angular/core/testing';

import { CppitemsService } from './cppitems.service';

describe('CppitemsService', () => {
  let service: CppitemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CppitemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
