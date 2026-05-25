import { Component, input } from "@angular/core";
import type { Elements } from "@kontent-ai/delivery-sdk";

import { type ArticleType, type EventType, isArticleType, isEventType } from "../../../model/index";
import { Divider } from "../divider/divider";
import { FeaturedArticle } from "../featured-article/featured-article";
import { FeaturedEvent } from "../featured-event/featured-event";
import { PageSection } from "../page-section/page-section";

@Component({
  selector: "app-featured-content",
  imports: [FeaturedArticle, FeaturedEvent, PageSection, Divider],
  templateUrl: "./featured-content.html",
})
export class FeaturedContent {
  readonly featuredContent = input.required<Elements.LinkedItemsElement<EventType | ArticleType>>();

  protected get articles(): ArticleType[] {
    return this.featuredContent().linkedItems.filter(isArticleType);
  }

  protected get events(): EventType[] {
    return this.featuredContent().linkedItems.filter(isEventType);
  }
}
