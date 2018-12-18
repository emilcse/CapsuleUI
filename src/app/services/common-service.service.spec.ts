import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CommonServiceService } from './common-service.service';

describe('CommonServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CommonServiceService]
    });
  });

  it('should be created', inject([CommonServiceService], (service: CommonServiceService) => {
    expect(service).toBeTruthy();
  }));
});
