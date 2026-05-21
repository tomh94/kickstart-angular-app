import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import {
  transformToPortableText,
  type PortableTextBlock,
  type PortableTextComponentOrItem,
  type PortableTextObject,
} from '@kontent-ai/rich-text-resolver';
import type { LandingPageType } from '../../../model/types/landing-page.generated';
import type { VideoType } from '../../../model/types/video.generated';
import { isVideoType } from '../../../model/types/video.generated';
import { blockToHtml, listToHtml } from './portable-text-to-html';
import { Video } from '../video/video';

type HtmlItem = { kind: 'html'; html: SafeHtml };
type VideoItem = { kind: 'video'; video: VideoType };
type RenderItem = HtmlItem | VideoItem;

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.html',
  imports: [Video],
})
export class PageContent {
  readonly body = input.required<LandingPageType['elements']['body_copy']>();

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly items = computed<RenderItem[]>(() => {
    const blocks = transformToPortableText(this.body().value) as PortableTextObject[];
    const result: RenderItem[] = [];
    let i = 0;

    while (i < blocks.length) {
      const block = blocks[i];

      if (block._type === 'block' && (block as PortableTextBlock).listItem) {
        const listType = (block as PortableTextBlock).listItem as 'bullet' | 'number';
        const group: PortableTextBlock[] = [];
        while (
          i < blocks.length &&
          blocks[i]._type === 'block' &&
          (blocks[i] as PortableTextBlock).listItem === listType
        ) {
          group.push(blocks[i] as PortableTextBlock);
          i++;
        }
        result.push({
          kind: 'html',
          html: this.sanitizer.bypassSecurityTrustHtml(listToHtml(group, listType)),
        });
        continue;
      }

      if (block._type === 'block') {
        result.push({
          kind: 'html',
          html: this.sanitizer.bypassSecurityTrustHtml(blockToHtml(block as PortableTextBlock)),
        });
        i++;
        continue;
      }

      if (block._type === 'componentOrItem') {
        const ref = (block as PortableTextComponentOrItem).componentOrItem._ref;
        const linked = this.body().linkedItems.find((item) => item.system.codename === ref);
        if (linked && isVideoType(linked)) {
          result.push({ kind: 'video', video: linked });
        }
        i++;
        continue;
      }

      i++;
    }

    return result;
  });

  protected isHtml(item: RenderItem): item is HtmlItem {
    return item.kind === 'html';
  }

  protected isVideo(item: RenderItem): item is VideoItem {
    return item.kind === 'video';
  }
}
