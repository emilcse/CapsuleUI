import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectManagerService } from './ProjectManager.service';
 

describe('ProjectManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProjectManagerService]
    });
  });

  it('should be created', inject([ProjectManagerService], (service: ProjectManagerService) => {
    expect(service).toBeTruthy();
  }));
});
