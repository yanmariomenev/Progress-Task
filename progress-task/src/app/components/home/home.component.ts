import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }
  public userSubscription: Subscription;
  public gridData: User[];

  ngOnInit(): void {
   this.userSubscription = this.userService.getUsers().subscribe((userData: User[]) =>
    {console.log(userData), this.gridData = userData;})
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
