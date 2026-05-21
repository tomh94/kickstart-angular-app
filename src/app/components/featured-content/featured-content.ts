import { Component, input } from '@angular/core';
import type { Elements } from '@kontent-ai/delivery-sdk';

import { isArticleType, type ArticleType } from '../../../model';
import { isEventType, type EventType } from '../../../model';
import { Divider } from '../divider/divider';
import { FeaturedArticle } from '../featured-article/featured-article';
import { FeaturedEvent } from '../featured-event/featured-event';
import { PageSection } from '../page-section/page-section';

@Component({
  selector: 'app-featured-content',
  imports: [FeaturedArticle, FeaturedEvent, PageSection, Divider],
  templateUrl: './featured-content.html',
})
export class FeaturedContent {
  readonly featuredContent = input.required<Elements.LinkedItemsElement<EventType | ArticleType>>();

  protected get article(): ArticleType | null {
    return this.featuredContent().linkedItems.find(isArticleType) ?? null;
  }

  protected get event(): EventType | null {
    return this.featuredContent().linkedItems.find(isEventType) ?? null;
  }
}
