import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args.UserNameSearch) {
      value = value.filter(user => user.First_Name.toLowerCase().indexOf(args.UserNameSearch.toLowerCase()) != -1 || (user.Last_Name.toLowerCase().indexOf(args.UserNameSearch.toLowerCase()) != -1));
    }

    if (args.ProjectSearch) {
      value = value.filter(task => task.Project_Name.toLowerCase().indexOf(args.ProjectSearch.toLowerCase()) != -1);
    }

    if (args.AllProjectSearch) {
      value = value.filter(proj => proj.Project.toLowerCase().indexOf(args.AllProjectSearch.toLowerCase()) != -1);
    }

    if (args.radioProjectSearch) {
      value = value.filter(project => project.Project.toLowerCase().indexOf(args.radioProjectSearch.toLowerCase()) != -1);
    }

    if (args.radioTaskProjectSearch) {
      value = value.filter(proj => proj.Project.toLowerCase().indexOf(args.radioTaskProjectSearch.toLowerCase()) != -1);
    }

    if (args.radioManagerSearch) {
      value = value.filter(manager => manager.Manager_ID == args.radioManagerSearch);
    }

    if (args.radioParentTaskSearch) {
      value = value.filter(parent => parent.Parent_Task.toLowerCase().indexOf(args.radioParentTaskSearch.toLowerCase()) != -1);
    }

    if (args.radioUserTaskSearch) {
      value = value.filter(user => user.First_Name.toLowerCase().indexOf(args.radioUserTaskSearch.toLowerCase()) != -1 || (user.Last_Name.toLowerCase().indexOf(args.radioUserTaskSearch.toLowerCase()) != -1));
    }

    return value;

  }

}
