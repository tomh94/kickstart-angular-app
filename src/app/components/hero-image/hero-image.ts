import { computed, Component, input } from '@angular/core';
import type { Elements } from '@kontent-ai/delivery-sdk';

@Component({
  selector: 'app-hero-image',
  templateUrl: './hero-image.html',
})
export class HeroImage {
  readonly headline = input<Elements.TextElement>();
  readonly subheadline = input<Elements.TextElement>();
  readonly heroImage = input<Elements.AssetsElement>();

  protected readonly img = computed(() => this.heroImage()?.value[0] ?? null);
}
