import { Component, input } from '@angular/core';
import type { EventType } from '../../../model';
import { FeaturedComponentBase } from '../featured-component-base/featured-component-base';

@Component({
  selector: 'app-featured-event',
  imports: [FeaturedComponentBase],
  templateUrl: './featured-event.html',
})
export class FeaturedEvent {
  readonly event = input.required<EventType>();

  protected formatDate(value: string | null | undefined): string {
    if (!value) return '';
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    });
  }

  protected get dateRange(): string {
    const start = this.formatDate(this.event().elements.start_date?.value);
    const end = this.formatDate(this.event().elements.end_date?.value);
    return end ? `${start} - ${end}` : start;
  }

  protected get tags(): string[] {
    const types = this.event().elements.event_type?.value.map((t) => t.name.toUpperCase()) ?? [];
    const topics = this.event().elements.event_topic?.value.map((t) => t.name.toUpperCase()) ?? [];
    return [...types, ...topics];
  }
}
