import { TestBed } from '@angular/core/testing';

import { CommandeService } from './commande.service';

describe('CommandeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommandeService = TestBed.get(CommandeService);
    expect(service).toBeTruthy();
  });
});
