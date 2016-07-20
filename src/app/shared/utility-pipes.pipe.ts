
import { Pipe } from '@angular/core';

// Filter Array of Objects
@Pipe({ name: 'filter' })
export class FilterPipe {
    transform(value: any[], args: string) {
        if (!args || !value) {
            return value;
        } else {
            return value.filter(item => {
                for (let key in item) {
                    if ((typeof item[key] === 'string' || item[key] instanceof String) &&
                        (item[key].indexOf(args) !== -1)) {
                        console.log(key, "matches", args)
                        return true;
                    }
                }
            });
        }
    }
}

/*
 Sort a list of objects, descending by default
*/
@Pipe({ name: 'sort' })
export class SortPipe {
    transform(list: any[], args: [string, boolean]) {
        let param: string = args[0];
        let reverse: number = args[1] ? -1 : 1;
        if (!args || !param || !list) {
            return list;
        } else {
            return list.sort(
                (a, b) => {
                    if (a[param] === b[param]) {
                        return 0;
                    } else if (a[param] < b[param]) {
                        return -1 * reverse;
                    } else {
                        return 1 * reverse;
                    }
                });
        }
    }
}