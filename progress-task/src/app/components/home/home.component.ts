import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent, SelectableSettings } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy, State  } from '@progress/kendo-data-query';
import { Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { IUser, User } from '../models/IUser.model';
import { NewUser } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy  {

  constructor(private userService: UserService) {
   }

  //  public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
      };

    public editDataItem: User;
    public isNew: boolean;

  public pageSize = 10;
  public skip = 0;
  public userSubscription: Subscription;
  public gridView: GridDataResult;
  private items: User[];
  public checked = true;
  public multiple = false;
  public allowUnsort = true;
  public sort: SortDescriptor[] = [
  {
    field: 'amount',
    dir: 'asc'
  },
  ];

  ngOnInit(): void {
   this.loadData();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.pageUsers();
  }
  private pageUsers(): void {
    this.gridView = {
        data: this.items.slice(this.skip, this.skip + this.pageSize),
        total: this.items.length
    };
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.sortItems();
}

private sortItems(): void {
  this.gridView = {
      data: orderBy(this.items, this.sort),
      total: this.items.length
  };
}

getColor(id: number, amount: number){
  return id % 2 == 0 ? 'purple' : 'blue';
 }
 getColorForAmount(amount: number){
  return amount >= 500 ? 'green' : 'red';
 }

 public selectableSettings: SelectableSettings = {
  enabled: true
};

private loadData(){
   return this.userSubscription = this.userService.getUsers()
  .subscribe((userData: User[]) =>
  {console.log(userData), this.items = userData; this.pageUsers()})
}

public addHandler(user: User) {
  this.editDataItem = new NewUser();
  this.isNew = true;
}

public editHandler({dataItem}) {
  this.editDataItem = dataItem;
  this.isNew = false;
}

public cancelHandler() {
  this.editDataItem = undefined;
}

public saveHandler(user: User) {
  this.userService.save(user, this.isNew);

  this.editDataItem = undefined;
  this.loadData();

}

public removeHandler({dataItem}) {
  this.userService.remove(dataItem);
  this.loadData();
}

}

