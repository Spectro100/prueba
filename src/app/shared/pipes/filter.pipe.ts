import { Pipe, PipeTransform } from "@angular/core";
import { User } from "src/app/models/userform.model";

@Pipe({
    name: 'filter'
})
export class FilterPipe implements PipeTransform {
    public transform(user: User[], filter: string): User[] {
        return user.filter(user => user.name.includes(filter));
    }
}