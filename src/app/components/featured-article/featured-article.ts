import { Component, computed, input } from '@angular/core';
import type { ArticleType } from '../../../model';
import { formatDate } from '../../utils/date';
import { FeaturedComponentBase } from '../featured-component-base/featured-component-base';

@Component({
  selector: 'app-featured-article',
  imports: [FeaturedComponentBase],
  templateUrl: './featured-article.html',
})
export class FeaturedArticle {
  readonly article = input.required<ArticleType>();

  protected readonly publishDate = computed(() =>
    formatDate(this.article().elements.publish_date?.value),
  );
}
