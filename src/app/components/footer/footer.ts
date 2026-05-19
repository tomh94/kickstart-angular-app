import { Component } from '@angular/core';
import {Divider} from '../divider/divider';
import {Navigation} from '../navigation/navigation';
import {Logo} from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [
    Divider,
    Navigation,
    Logo
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
