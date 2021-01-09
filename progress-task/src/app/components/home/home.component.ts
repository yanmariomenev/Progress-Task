import { Component, OnDestroy, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs';
import { products } from 'src/app/core/data/products';
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

  ngOnInit(): void {
    this.userSubscription = this.userService.getUsers().subscribe((userData: User[]) =>
    {console.log(userData), this.items = userData; this.loadUsers()})
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
}

