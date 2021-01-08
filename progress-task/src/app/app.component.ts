import { Component } from '@angular/core';
import { products } from './core/data/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'progress-task';
  public gridData: any[] = products;
}
