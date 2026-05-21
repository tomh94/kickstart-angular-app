import { Component, input } from '@angular/core';
import { Container } from '../container/container';

@Component({
  selector: 'app-page-section',
  imports: [Container],
  templateUrl: './page-section.html',
})
export class PageSection {
  readonly color = input.required<string>();
}
