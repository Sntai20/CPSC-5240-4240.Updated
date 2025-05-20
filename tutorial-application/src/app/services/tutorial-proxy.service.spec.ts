import { TestBed } from '@angular/core/testing';

import { TutorialProxyService } from './tutorial-proxy.service';

describe('TutorialProxyService', () => {
  let service: TutorialProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutorialProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
