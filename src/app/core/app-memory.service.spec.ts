import { TestBed, inject } from '@angular/core/testing';

import { AppMemoryService } from './app-memory.service';

describe('AppMemoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppMemoryService]
    });
  });

  it('should be created', inject([AppMemoryService], (service: AppMemoryService) => {
    expect(service).toBeTruthy();
  }));
});
