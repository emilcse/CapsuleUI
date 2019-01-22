import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component';
import { Component, NgModule, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectManagerService } from './services/ProjectManager.service';
import { FilterPipe } from './pipes/filter.pipe';
import { PagerService } from './services/pageService';
import { AlertsModule } from 'angular-alert-module';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
import { OrderPipe, OrderModule } from 'ngx-order-pipe';

declare var $: any;

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const parentTaskDetail: any = [
    {
      "Parent_Task": "Parent Task 1",
      "Parent_ID": 1

    },
    {
      "Parent_Task": "Parent Task 2",
      "Parent_ID": 2

    },
    {
      "Parent_Task": "Parent Task 3",
      "Parent_ID": 3

    }
  ];

  
  const taskDetail: any = [
    {
      "Project_ID": "1",
      "Task_ID": "1",
      "Project": "Project Name1",
      "Parent_ID": 2,
      "Parent_Task": "Parent Task 1",
      "Task": "Test 1",
      "Start_Date": "09/07/2018",
      "End_Date": "09/08/2018",
      "Priority": 4,
      "Manager_ID": 123,
      "ProjStatus": "10%",
      "Status": 0,
      "Is_Active": 1,
      "User_ID": 4,
      "Project_Name": "Test"
    },
    {
      "Project_ID": "1",
      "Task_ID": "1",
      "Project": "Project Name1",
      "Parent_ID": 2,
      "Parent_Task": "Parent Task 2",
      "Task": "Test 1",
      "Start_Date": "09/07/2018",
      "End_Date": "09/08/2018",
      "Priority": 4,
      "Manager_ID": 123,
      "ProjStatus": "12%",
      "Status": 0,
      "Is_Active": 1,
      "User_ID": 4,
      "Project_Name": "Test"
    },
    {
      "Project_ID": "1",
      "Task_ID": "1",
      "Project": "Project Name1",
      "Parent_ID": 2,
      "Parent_Task": "Parent Task 3",
      "Task": "Test 1",
      "Start_Date": "09/07/2018",
      "End_Date": "09/08/2018",
      "Priority": 4,
      "Manager_ID": 123,
      "ProjStatus": "100%",
      "Status": 0,
      "Is_Active": 1,
      "User_ID": 4,
      "Project_Name": "Test"
    }
  ];

  const projectDetail: any = [
    {
      "Project_ID": "1",
      "Task_ID": "1",
      "Project": "Project Name1",
      "Parent_ID": 2,
      "Task": "Test 1",
      "Start_Date": "09/07/2018",
      "End_Date": "09/08/2018",
      "Priority": 4,
      "Manager_ID": 123,
      "ProjStatus": "Completed",
      "Is_Active": 1,
      "TaskCount": 4
    },
    {
      "Project_ID": "2",
      "Task_ID": "2",
      "Project": "Project Name2",
      "Parent_ID": 2,
      "Task": "Test 2",
      "Start_Date": "09/07/2018",
      "End_Date": "09/08/2018",
      "Priority": 20,
      "Manager_ID": 1234,
      "ProjStatus": "Pending",
      "Is_Active": 0,
      "TaskCount": 4
    },
    {
      "Project_ID": "3",
      "Task_ID": "3",
      "Project": "Project Name3",
      "Parent_ID": 3,
      "Task": "Test 3",
      "Start_Date": "09/07/2018",
      "End_Date": "09/08/2018",
      "Priority": 15,
      "Manager_ID": 12345,
      "ProjStatus": "Pending",
      "Is_Active": 0,
      "TaskCount": 4
    }
  ];

    const managerDetails: any = [
    {
      "Manager_ID": "101"

    },
    {
      "Manager_ID": "102"
    }
  ];

  const projectList: any = [
    {
      "Project_ID" : 1,
      "Project" : "Project1",

    },
    {
      "Project_ID" : 1,
      "Project" : "Project1",
    }
  ];
  

  const userDetails: any = [
    {
      "User_ID": "1",
      "First_Name": "Elan",
      "Last_Name": "Chelian",
      "Employee_ID": "101"
    },
    {
      "User_ID": "2",
      "First_Name": "Raj",
      "Last_Name": "Kumar",
      "Employee_ID": "102"
    }
  ];


  let mockService = {
    getParentTask(): Observable<any> {
      return of(parentTaskDetail);
    },

    getTaskManager(): Observable<any> {
      return of(taskDetail);
    },

    getProjectDetails(): Observable<any> {
      return of(projectDetail);
    },

    getProjectName():Observable<any> {
      return of(projectList);
    },

    getManagerDetails(): Observable<any> {
      return of(managerDetails);
    },

    getUserDetails(): Observable<any> {
      return of(userDetails);
    },

    submitTask(task): Observable<any> {
      taskDetail.unshift(task);
      return of(task);
    },

    onProjectSubmit(project): Observable<any> {
      projectDetail.unshift(project);
      return of(project);
    },

    updateEndTask(task): Observable<any> {
      let idx = taskDetail.findIndex(x => x.Task_ID == task.Task_ID);
      if (idx !== -1) {
        taskDetail[idx] = task;
      }
      return of(task);
    },
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, FilterPipe
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, FormsModule, AlertsModule, ReactiveFormsModule],
      providers: [{ provide: ProjectManagerService, useValue: mockService }, PagerService,OrderPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should be get Parent Task List', inject([ProjectManagerService], (service: ProjectManagerService) => {
    service.getParentTask().subscribe(data => { component.parentTaskList = data; });
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

  it('should be get Task Details', inject([ProjectManagerService], (service: ProjectManagerService) => {
    service.getTaskManager().subscribe(data => { component.pagedItems = data; });
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

  it('should be get Project Details', inject([ProjectManagerService], (service: ProjectManagerService) => {
    service.getProjectDetails().subscribe(data => { component.projDetails = data; });
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));


  it('should be get Manager details', inject([ProjectManagerService], (service: ProjectManagerService) => {
    service.getManagerDetails().subscribe(data => { component.managerDetails = data; });
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

  it('should be get User Details', inject([ProjectManagerService], (service: ProjectManagerService) => {
    service.getUserDetails().subscribe(data => { component.userDetails = data; });
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));

  it('should be get Updated Task details', inject([ProjectManagerService], (service: ProjectManagerService) => {
    service.getTaskManager().subscribe(data => { component.pagedItems = data; });
    fixture.detectChanges();
    expect(service).toBeTruthy();
  }));
});
