import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../services/common.service';

declare var moment: any;
@Pipe({ name: 'customeMoment' })
export class CustomeMoment implements PipeTransform {
    constructor(
        public sharedService: CommonService
    ) { }

    transform(date: any, format?: any, convertTolocal?: boolean): any {
        if (date == undefined) {
            return date;
        }
        if (format == undefined) {
            return date;
        }
        else {
            let _return = convertTolocal ? this.sharedService.convertToLocal(date, 'llll') : moment(date).format(format);
            _return = _return == 'Invalid date' ? '' : _return;
            return _return;
        }
    }

}
