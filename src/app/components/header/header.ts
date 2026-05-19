import { Component } from '@angular/core';
import { Logo} from '../logo/logo';
import {Navigation} from '../navigation/navigation';
import {Container} from '../container/container';

@Component({
  selector: 'app-header',
  imports: [Logo, Navigation, Navigation, Container],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
