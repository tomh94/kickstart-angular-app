import { Component, inject} from '@angular/core';
import {Layout} from './components/layout/layout';
import {Api} from './services/api';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  api = inject(Api);

  response$ = this.api.getItems()

}
