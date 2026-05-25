import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import {
  transformToPortableText,
  type PortableTextBlock
} from '@kontent-ai/rich-text-resolver';
import {type VideoType, type LandingPageType, isVideoType } from '../../../model';
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
    const blocks = transformToPortableText(this.body().value);
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
          html: this.sanitizer.bypassSecurityTrustHtml(blockToHtml(block)),
        });
        i++;
        continue;
      }

      if (block._type === 'componentOrItem') {
        const ref = (block).componentOrItem._ref;
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
