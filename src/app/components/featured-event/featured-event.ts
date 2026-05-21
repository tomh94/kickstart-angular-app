import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { transformToPortableText, type PortableTextBlock } from '@kontent-ai/rich-text-resolver';
import type { EventType } from '../../../model';
import { blockToHtml } from '../page-content/portable-text-to-html';
import { FeaturedComponentBase } from '../featured-component-base/featured-component-base';

@Component({
  selector: 'app-featured-event',
  imports: [FeaturedComponentBase],
  templateUrl: './featured-event.html',
})
export class FeaturedEvent {
  readonly event = input.required<EventType>();

  private readonly sanitizer = inject(DomSanitizer);

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

  protected readonly descriptionHtml = computed<SafeHtml | null>(() => {
    const raw = this.event().elements.description?.value ?? '';
    if (!raw || raw === '<p><br></p>') return null;
    const blocks = transformToPortableText(raw) as unknown as PortableTextBlock[];
    const html = blocks
      .filter((b) => b._type === 'block')
      .map((b) => blockToHtml(b))
      .join('');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  });

  protected get showReadMore(): boolean {
    const raw = this.event().elements.description?.value ?? '';
    return raw !== '' && raw !== '<p><br></p>';
  }
}
