import { Component, computed, inject, input } from "@angular/core";
import { DomSanitizer, type SafeHtml } from "@angular/platform-browser";
import type { EventType } from "../../../model/index";
import { formatDate } from "../../utils/date";
import { FeaturedComponentBase } from "../featured-component-base/featured-component-base";
import { isRichTextEmpty, richTextToHtml } from "../page-content/portable-text-to-html";

@Component({
  selector: "app-featured-event",
  imports: [FeaturedComponentBase],
  templateUrl: "./featured-event.html",
})
export class FeaturedEvent {
  readonly event = input.required<EventType>();

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly dateRange = computed(() => {
    const start = formatDate(this.event().elements.start_date?.value);
    const end = formatDate(this.event().elements.end_date?.value);
    return end ? `${start} - ${end}` : start;
  });

  protected readonly tags = computed(() => {
    const types = this.event().elements.event_type?.value.map((t) => t.name.toUpperCase()) ?? [];
    const topics = this.event().elements.event_topic?.value.map((t) => t.name.toUpperCase()) ?? [];
    return [...types, ...topics];
  });

  protected readonly descriptionHtml = computed<SafeHtml | null>(() => {
    const raw = this.event().elements.description?.value ?? "";
    if (isRichTextEmpty(raw)) {
      return null;
    }
    return this.sanitizer.bypassSecurityTrustHtml(richTextToHtml(raw));
  });

  protected readonly showReadMore = computed(
    () => !isRichTextEmpty(this.event().elements.description?.value ?? ""),
  );
}
