import { Component, OnInit } from '@angular/core';
import { products } from 'src/app/core/data/products';
import { UserService } from 'src/app/core/services/user.service';
import { IUser, User } from '../models/IUser.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService) { }
  public gridData: any[] = products;
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {console.log(data)})
  }

}
