import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args.Parent_ID){
       value = value.filter(task => task.Parent_ID == args.Parent_ID);
    }
    if(args.Task){
       value = value.filter(task => task.Task.toLowerCase().indexOf(args.Task.toLowerCase()) != -1);
    }
    if(args.PriorityFrom){
       value = value.filter(task =>  task.Priority >= args.PriorityFrom );
    }
     if(args.PriorityTo){
       value = value.filter(task =>  task.Priority <= args.PriorityTo );
    }
    if(args.Start_Date){
       value = value.filter((task) => {
        let Start_Date = task.Start_Date.substring(0,10).split('-');
        let startDateSearch = args.Start_Date.substring(0,10).split('-');
        return new Date(Start_Date[0],Start_Date[1]-1,Start_Date[2]) >= new Date(startDateSearch[0],startDateSearch[1]-1,startDateSearch[2]);
      });
    }
    if(args.End_Date){
       value = value.filter((task) => {
        let End_Date = task.End_Date.substring(0,10).split('-');
        let endDateSearch = args.End_Date.substring(0,10).split('-');
        return new Date(End_Date[0],End_Date[1]-1,End_Date[2]) <= new Date(endDateSearch[0],endDateSearch[1]-1,endDateSearch[2]);
      });
    }


    return value;

  }

}
