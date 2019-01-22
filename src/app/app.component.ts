import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ProjectManagerService } from './services/ProjectManager.service';
import { Http, Response } from '@angular/http';
import { PagerService } from './services/pageService';
import { AlertsModule } from 'angular-alert-module';
import Swal from 'sweetalert2';
import { OrderPipe, OrderModule } from 'ngx-order-pipe';


declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PagerService]
})

@NgModule({
  declarations: [],

  imports: [OrderPipe],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppComponent implements OnInit {
  constructor(private appServices: ProjectManagerService, private pageService: PagerService,
    private fb: FormBuilder, private orderPipe: OrderPipe) { }

  title = 'Project-Manager';
  parentTaskList: any;
  taskDetails: any = [];
  userDetails: any = [];
  projDetails: any = [];
  managerDetails: any = [];
  projectNameList: any = [];
  pager: any = {};
  pagedItems: any = [];
  page: number;
  response: any;
  search: any = {
    projSearch: '',
    userSearch: ''

  }
  deleteUserValue: any = [];

  key: string = ''; //set default
  reverse: boolean = false;
  submitted: boolean = false;
  addUserSubmitted: boolean = false;
  projectSubmitted: boolean = false;
  projShow: boolean = true;
  userShow: boolean = false;
  taskShow: boolean = false;
  myForm: FormGroup;
  addUserForm: FormGroup;
  myProjectForm: FormGroup;
  viewTaskForm: FormGroup;
  orderBy: boolean = false;
  isUserUpdate: boolean = false;
  filter = false;
  Start_Date = new Date();
  selectedManager: string = '';
  selectedProject: string = '';
  selectedParentTask: string = '';
  selectedUser: string = '';
  searchedProject: string = '';
  isTaskUpdate: boolean = false;
  Priority: number;

  public ngAfterContentInit() {

  }


  public ngOnInit() {
    this.callAllMethods();

   //Project model
    this.myProjectForm = this.fb.group({
      ProjectID: 0,
      ProjectName: ['', Validators.required],
      Priority: [0, Validators.required],
      StartDate: ['', Validators.required],
      EndDate: ['', Validators.required],
      // Employee_ID: [''],
      // Manager_Name: [''],
      // Project: [''],
      // //Priority: 0,
      ManagerID: [''],
      // Status: 1,
      // NoOfTasks: 0,           
      // CompletedTasks: [''],
      selectedManager: [{ disabled: true, value: '' }, Validators.required],
      // Active_Progress:['']
    });

    // Task Model

    this.myForm = this.fb.group({
      Task_ID: 0,
      Task: ['', Validators.required],
      Priority: [0, Validators.required],
      Parent_ID: [''],
      Parent_Task: [''],
      Start_Date: ['', Validators.required],
      End_Date: [''],    
      IsActive: 0,
      Project_ID: 0,      
      User_ID: [''],
      selectedProject: [{ disabled: true, value: '' }, Validators.required],
      selectedParentTask: [{ disabled: true, value: '' }, Validators.required],
      selectedUser: [{ disabled: true, value: '' }, Validators.required]
      //Project_Name: [''],

    });


    // User Model

    this.addUserForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      User_ID: 0,
      Employee_ID: ['', Validators.required]
    });

    this.viewTaskForm = this.fb.group({
      searchedProject: [{ disabled: true, value: '' }]
    });

//Search model pop up

    $('.modal').on('hidden.bs.modal', (e) => {
      if (e.target.id == 'managerModal') {
        this.myProjectForm.get('selectedManager').setValue(this.selectedManager);
      };
      if (e.target.id == 'projNameModal') {
        this.myForm.get('selectedProject').setValue(this.selectedProject);
      };
      if (e.target.id == 'parentTaskModal') {
        this.myForm.get('selectedParentTask').setValue(this.selectedParentTask);
      };
      if (e.target.id == 'userModal') {
        this.myForm.get('selectedUser').setValue(this.selectedUser);
      };
      if (e.target.id == 'taskProjectModal') {
        this.viewTaskForm.get('searchedProject').setValue(this.searchedProject);
      };
    })

  };

  //Load Project, User Task details 
  callAllMethods() {        
    this.getProjectDetails();
    this.getTaskManager();
    this.getUserDetails();
    this.getManagerDetails();
    this.getParentDetails();
  };

  // Get  Parent details

  getParentDetails() {
    this.appServices.getParentTask().subscribe(data => {
      this.parentTaskList = data;
    });
  };

  // Get active Project details
  getProjectDetails() {
    this.appServices.getProjectDetails().subscribe(data => {
      this.projDetails = data;
      this.projectNameList = data;
    });
  };

  // Get  manager details
  getManagerDetails() {    
    debugger;
    this.appServices.getManagerDetails().subscribe(data => {      
      this.managerDetails = data;
    });
  };



// Add Project
  onProjectSubmit() {
    debugger;
    this.projectSubmitted = true;
    var vMangerName = this.selectedManager;
    if (vMangerName == "") {
      vMangerName = this.myProjectForm.value.ManagerID;
    }

    if (this.myProjectForm.valid) {
      if (this.compareTwoDates(this.myProjectForm.value)) {
        var VID = this.myProjectForm.value.ProjectID;

        var vProjForm = {
          ProjectID: VID,
          ProjectName: this.myProjectForm.value.ProjectName,
          StartDate: this.myProjectForm.value.StartDate,
          EndDate: this.myProjectForm.value.EndDate,
          Priority: this.myProjectForm.value.Priority,
          ManagerID: vMangerName,
          Status: 1
        };

        this.appServices.submitProject(vProjForm).subscribe(data => {
          if (data) {
            Swal('Success', `Data ${VID == 0 ? 'Added' : 'Updated'} successfully...`, 'success');
            this.myProjectForm.reset();
            this.projectSubmitted = false;
            this.callAllMethods();
          }
          else {
            Swal('Failed', 'Please try again..', 'error');
          }
        });

      }
      else {
        Swal('Failed', 'End Date should be greater than Start Date', 'error');

      }
    }
    else {
      Swal('Failed', 'All fields are mandatory.', 'error');

    }
  };

  /// Edit Project Details
  EditProject(proj) {
    debugger;
    proj.ProjectName = proj.ProjectName;
    proj.Priority = proj.Priority;
    proj.EmployeeId = proj.ManagerID;
    proj.Manager_Name = '';
    proj.selectedManager = proj.ManagerID;
    if (proj.StartDate != null)
      proj.StartDate = proj.StartDate.slice(0, 10);
    if (proj.EndDate != null)
      proj.EndDate = proj.EndDate.slice(0, 10);
    proj.ProjectID = proj.ProjectID;
    proj.Status = 1;
      this.myProjectForm.setValue(proj);
    // var updateProject = {
    // ProjectName : proj.ProjectName,
    // Priority:proj.Priority,
    // EmployeeId:proj.ManagerID,
    // Manager_Name : '', 
    // selectedManager : proj.ManagerID,
    // StartDate : proj.StartDate != null ? proj.StartDate.slice(0,10): '',
    // EndDate : proj.EndDate != null ? proj.EndDate.slice(0,10): '',
    // ProjectID : proj.ProjectID,
    // Status : true
    // };
    //this.myProjectForm.setValue(updateProject);
  };

// Reset Project Details
  public ResetProject() {
    this.myProjectForm.reset();
    this.submitted = false;
  }

  // Suspend Project Details
  public SuspendProject(proj) {
    debugger;
    proj.Status = 0;
    this.appServices.SuspendProject(proj).subscribe(data => {
      if (data) {
        Swal('Success', `Data Suspended successfully...`, 'success');

        this.callAllMethods();
      }
      else {
        Swal('Failed', 'Please try again..', 'error');
      }
    });
  }
// End Project section

// Task Manager section


//Get Task Manager
  getTaskManager() {
    this.appServices.getTaskManager().subscribe(data => {
      this.taskDetails = data;
      this.setPage(1);
    });
  };

  // Add Task Manager
  onSubmit() {
    this.submitted = true;
    var VID = this.myForm.value.Task_ID;

    var vProjName = this.selectedProject;
    if (vProjName == "")
      vProjName = this.myForm.value.Project_ID;

    var vParentTask = this.selectedParentTask;
    if (vParentTask == "")
      vParentTask = this.myForm.value.Parent_ID;

    var vUserName = this.selectedUser;
    if (vUserName == "")
      vUserName = this.myForm.value.User_ID;

    if (this.myForm.valid && vProjName != "" && vParentTask != "" && vUserName != "") {
      if (this.compareTwoDates(this.myForm.value)) {
        debugger;
        var vTaskForm = {
          Task_ID: VID,
          Parent_ID: vParentTask,
          Task: this.myForm.value.Task,
          Start_Date: this.myForm.value.Start_Date,
          End_Date: this.myForm.value.End_Date,
          Priority: this.myForm.value.Priority,
          Project_ID: vProjName,
          User_ID: vUserName,
          IsActive:1
        };
        debugger;
        this.appServices.submitTask(vTaskForm).subscribe(data => {
          if (data) {
            Swal('success', `Data ${VID == 0 ? 'Added' : 'Updated'} successfully...`, 'success');
            this.myForm.reset();
            this.submitted = false;
            this.callAllMethods();
            this.isTaskUpdate = false;
            this.filter = true;
          }
          else {
            Swal('Failed', 'Please try again..', 'error');
          }
        });
      }
      else {
        Swal('Failed', 'End Date should be greater than Start Date', 'error');

      }
    }
    else {
      Swal('Failed', 'All fields are mandatory.', 'error');

    }
  };

  // Edit Task details

  public EditTask(task) {
debugger;
    this.isTaskUpdate = true;
    this.filter = false;  
    task.IsActive = 1;
    task.Task = task.Task;
    task.selectedProject = task.Project_ID;
    task.selectedParentTask = task.Parent_ID;
    task.selectedUser = task.User_ID;
    task.Parent_Task = task.Parent_Task;
    $('.task-manager-page a[href="#addTask"]').tab('show');
    if (task.Start_Date != null)
      task.Start_Date = task.Start_Date.slice(0, 10);
    if (task.End_Date != null)
      task.End_Date = task.End_Date.slice(0, 10);
    this.myForm.setValue(task);
  };

  //End task details
  public EndTask(task) {
    task.IsActive = 0;
    debugger;
    if (task.End_Date != null && task.End_Date != "") {
      this.appServices.updateEndTask(task).subscribe(data => {

        this.callAllMethods();
        Swal('success', `Data updated successfully...`, 'success');
      });
    }
    else {
      Swal('Failed', 'Please provide End date...', 'error');
    }

  }
//Reset Task Details
  public ResetTask() {
    this.myForm.reset();
    this.submitted = false;
  }
/// End Task Manager section

//User section details

//Get User details
  getUserDetails() {
    this.appServices.getUserDetails().subscribe(data => {
      this.userDetails = data;
    });
  };

// Add new user
  AddUserSubmit() {
    debugger;
    this.addUserSubmitted = true;
    if (this.addUserForm.valid) {      
      var VID = this.addUserForm.value.User_ID;
      if(VID == null)
      {
        VID=0;
      }
      if(VID == 0)
      {
        this.appServices.submitUser(this.addUserForm.value).subscribe(data => {
        if (data) {
          Swal('Success', `Data ${VID == 0 ? 'Added' : 'Updated'} successfully...`, 'success');
          this.AddUserResetTask();
          this.callAllMethods();
        }
        else {
          Swal('Failed', 'Please try again..', 'error');
        }
        });
      }
      else if (VID >=1)
      {
        this.appServices.submitUser(this.addUserForm.value).subscribe(data => {
          if (data) {
            Swal('Success', `Data ${VID == 0 ? 'Added' : 'Updated'} successfully...`, 'success');
            this.AddUserResetTask();
            this.callAllMethods();
          }
          else {
            Swal('Failed', 'Please try again..', 'error');
          }
          });
      }
    }
  };

// Edit user details
  public EditUser(user) {
    debugger;
    this.isUserUpdate = true;
    this.addUserForm.setValue(user);    
  };

  // Delete user details
  public DeleteUser(user) {
    user.IsActive = 0;
    $("#deleteModal").modal();
    this.deleteUserValue = user;
  };


  //Delete user
  public ConfirmDeleteUser() {
    var vDeleteUserValue = this.deleteUserValue;
    this.appServices.deleteUser(vDeleteUserValue).subscribe(data => {
      if (data) {
        Swal('Success', `Data Deleted successfully...`, 'success');
      }
      else {
        Swal('Failed', 'Please try again..', 'error');
      }
      $("#deleteModal").modal('hide');
      this.AddUserResetTask();
      this.callAllMethods();
    });
  };

  // Reset USer details
  public AddUserResetTask() {
    this.addUserForm.reset();
    this.addUserSubmitted = false;
    this.isUserUpdate = false;
  }




  setPage(page: number) {
    if (this.pager.totalPages != 0) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }
    // get pager object from service
    this.pager = this.pageService.getPager(this.taskDetails.length, page);
    // get current page of items
    this.pagedItems = this.taskDetails.slice(this.pager.startIndex, this.pager.endIndex + 1);
  };


  compareTwoDates(data) {
    if (data.EndDate != null && data.EndDate != '') {
      if (new Date(data.EndDate) < new Date(data.StartDate))
        return false;

      else
        return true;
    }
    else {
      return true;
    }
  };

  AddProject() {
    this.userShow = false;
    this.taskShow = false;
    this.projShow = true;
  };

  AddTask() {
    this.userShow = false;
    this.taskShow = false;
    this.projShow = false;
  };

  AddUser() {
    this.userShow = true;
    this.taskShow = false;
    this.projShow = false;
  };

  ViewTask() {
    this.userShow = false;
    this.taskShow = true;
    this.projShow = false;
  };

  ManagerSearch() {
    debugger;
    this.selectedManager = this.myProjectForm.get('selectedManager').value;
    $("#managerModal").modal();

  };

  ProjectSearch() {    
    this.selectedProject = this.myForm.get('selectedProject').value;
    $("#projNameModal").modal();

  };

  ParentSearch() {
    this.selectedParentTask = this.myForm.get('selectedParentTask').value;
    $("#parentTaskModal").modal();

  };

  UserSearch() {
    this.selectedUser = this.myForm.get('selectedUser').value;
    $("#userModal").modal();

  };

  SearchTaskProject() {
    this.searchedProject = this.viewTaskForm.get('searchedProject').value;
    $("#taskProjectModal").modal();

  };

  onFilterChange() {
    this.filter = !this.filter;
  };

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  };

  onParentCheck() {
    this.filter = !this.filter;
    if (!this.filter) {
    }
  };


  sortProject(projectkey) {
    this.projDetails = this.orderPipe.transform(this.projDetails, projectkey);
  };

  sortUser(userkey) {
    this.userDetails = this.orderPipe.transform(this.userDetails, userkey);
  };

  sortTask(taskkey) {
    this.pagedItems = this.orderPipe.transform(this.pagedItems, taskkey);
  };
}