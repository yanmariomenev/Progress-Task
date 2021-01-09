import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy  } from '@progress/kendo-data-query';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { IUser, User } from '../models/IUser.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy  {

  constructor(private userService: UserService) {
   }

  public pageSize = 10;
  public skip = 0;
  public userSubscription: Subscription;
  public gridView: GridDataResult;
  private items: User[];

  public multiple = false;
  public allowUnsort = true;
  public sort: SortDescriptor[] = [
  {
    field: 'amount',
    dir: 'desc'
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
    this.loadUsers();
  }
  private loadUsers(): void {
    this.gridView = {
        data: this.items.slice(this.skip, this.skip + this.pageSize),
        total: this.items.length
    };
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.sortItems();
  
}
// Need to fix sorting of the amount. Doesn't sort numbers correctly.
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

private loadData(){
  this.userSubscription = this.userService.getUsers().subscribe((userData: User[]) =>
  {console.log(userData), this.items = userData; this.loadUsers()})
}

}

