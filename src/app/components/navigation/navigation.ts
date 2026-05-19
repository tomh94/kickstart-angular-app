import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {

 protected readonly menuItems  =  signal<readonly string[]>(["Solutions", "Products", "Pricing", "Contact", "Our Company"]);
}
