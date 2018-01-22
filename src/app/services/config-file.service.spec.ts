import { TestBed, inject } from '@angular/core/testing';

import { ConfigFileService } from './config-file.service';

describe('ConfigFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigFileService]
    });
  });

  it('should be created', inject([ConfigFileService], (service: ConfigFileService) => {
    expect(service).toBeTruthy();
  }));
});
