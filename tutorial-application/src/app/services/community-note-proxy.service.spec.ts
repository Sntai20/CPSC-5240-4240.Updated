import { TestBed } from '@angular/core/testing';

import { CommunityNoteProxyService } from './community-note-proxy.service';

describe('CommunityNoteProxyService', () => {
  let service: CommunityNoteProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityNoteProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});