import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser';
import type { VideoType } from '../../../model/types/video.generated';

@Component({
  selector: 'app-video',
  templateUrl: './video.html',
})
export class Video {
  readonly video = input.required<VideoType>();

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly autoplay = computed(
    () => this.video().elements.autoplay?.value[0]?.codename === 'true',
  );

  protected readonly src = computed<SafeResourceUrl>(() => {
    const link = this.video().elements.video_link?.value ?? '';
    const url = this.autoplay() ? `${link}&autoplay=1&mute=1` : link;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  });
}
