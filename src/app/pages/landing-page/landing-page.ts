import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { FeaturedContent } from '../../components/featured-content/featured-content';
import { HeroImage } from '../../components/hero-image/hero-image';
import { PageSection } from '../../components/page-section/page-section';
import { Api } from '../../services/api';

@Component({
  selector: 'app-landing-page',
  imports: [HeroImage, FeaturedContent, PageSection],
  templateUrl: './landing-page.html',
})
export class LandingPage {
  protected readonly landingPage = toSignal(
    inject(Api).getLandingPage().pipe(
      catchError((err) => {
        console.error('API error:', err);
        return of(null);
      })
    )
  );
}
