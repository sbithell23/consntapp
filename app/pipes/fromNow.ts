import { Pipe, PipeTransform } from '@angular/core';

declare var moment: any;
@Pipe({ name: 'fromNow' })
export class FromNow implements PipeTransform {
  constructor() { }

  transform(date: any, parameter?: any): any {
    if (date == undefined) {
      return date;
    }
    // if (parameter == undefined) {
    //   var stillUtc = moment.utc(date);
    //   var local = stillUtc.local();
    //   date = moment(local);
      return moment(date).fromNow();
    // }
    // else {
    //   return moment(date).format("MMM Do YY");
    // }
  }

}
