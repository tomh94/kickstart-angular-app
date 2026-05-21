import { computed, Component, input } from '@angular/core';
import type { Elements } from '@kontent-ai/delivery-sdk';

@Component({
  selector: 'app-featured-component-base',
  templateUrl: './featured-component-base.html',
})
export class FeaturedComponentBase {
  readonly type = input.required<'article' | 'event'>();
  readonly image = input<Elements.AssetsElement>();

  protected readonly img = computed(() => this.image()?.value[0] ?? null);
  protected readonly badge = computed(() =>
    this.type() === 'event' ? 'FEATURED EVENT' : 'FEATURED ARTICLE'
  );
}
