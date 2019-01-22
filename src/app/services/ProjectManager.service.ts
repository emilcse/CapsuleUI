import { Component, NgModule, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


var vURL = "http://localhost:8081/";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})

export class ProjectManagerService {

  constructor(public http: HttpClient) { }


  getParentTask() {
    return this.http.get(vURL + "api/TaskManager/GetParentTask");
  }

//

  getProjectDetails() {
    return this.http.get(vURL + "api/Project/GetProjectDetails");
  }

  getManagerDetails() {
    return this.http.get(vURL + "api/User/GetUserDetails");
  }


  submitProject(project) {
   

      return this.http.post(vURL + "api/Project/SaveProject", project, httpOptions);
  }

  SuspendProject(project) {    
    return this.http.post(vURL + "api/Project/Update", project, httpOptions);
  }
  // Code for Task screen

  getTaskManager() {
    return this.http.get(vURL + "api/TaskManager/GetTaskDetails");
  }

  submitTask(task) {    
    if(task.Task_ID==0){
    return this.http.post(vURL + "api/TaskManager/InsertTaskDetails", task, httpOptions);
    }
    else{
      return this.http.post(vURL + "api/TaskManager/InsertTaskDetails", task, httpOptions);
    }
  }

  updateEndTask(task) {
    return this.http.post(vURL + "api/TaskManager/EditTask", task);
  }

  // Code for User screen 


  getUserDetails() {
    return this.http.get(vURL + "api/User/GetUserDetails");
  }

  submitUser(user) {    
    debugger;
    return this.http.post(vURL + "api/User/SaveUser", user, httpOptions);
  }
  updateUser(user) {
    return this.http.post(vURL + "api/ProjectManager/User/Update", user, httpOptions);
  }
  deleteUser(user) {
    return this.http.post(vURL + "api/User/SaveUser", user, httpOptions);
  }


};
