import { Pipe, PipeTransform } from '@angular/core';
import { TableColumn } from '@shared/table/interface/table';

@Pipe({
  name: 'columnValue',
  standalone: true
})
export class ColumnValuePipe implements PipeTransform {
  transform(row: any, column: TableColumn): unknown {
    let displayValue = row[column.dataKey];

    if (column.dataType === 'object') {
      const keys = column.dataKey.split('.');
      let currentValue = row;

      for (const key of keys) {
        if (currentValue && currentValue.hasOwnProperty(key)) {
          currentValue = currentValue[key];
        } else {
          currentValue = null;
          break;
        }
      }

      displayValue = currentValue;
    }

    return displayValue;
  }
}
