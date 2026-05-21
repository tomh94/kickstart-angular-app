import { Component, input } from '@angular/core';
import type { ArticleType } from '../../../model/types/article.generated';
import { FeaturedComponentBase } from '../featured-component-base/featured-component-base';

@Component({
  selector: 'app-featured-article',
  imports: [FeaturedComponentBase],
  templateUrl: './featured-article.html',
})
export class FeaturedArticle {
  readonly article = input.required<ArticleType>();

  protected get publishDate() {
    const value = this.article().elements.publish_date?.value;
    if (!value) return null;
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    });
  }
}
