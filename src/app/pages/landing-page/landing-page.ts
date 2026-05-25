import { Component, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, of } from "rxjs";
import { ErrorPage } from "../../components/error-page/error-page";
import { FeaturedContent } from "../../components/featured-content/featured-content";
import { HeroImage } from "../../components/hero-image/hero-image";
import { Loader } from "../../components/loader/loader";
import { PageContent } from "../../components/page-content/page-content";
import { PageSection } from "../../components/page-section/page-section";
import { Api } from "../../services/api";

@Component({
  selector: "app-landing-page",
  imports: [HeroImage, FeaturedContent, PageContent, PageSection, Loader, ErrorPage],
  templateUrl: "./landing-page.html",
})
export class LandingPage {
  protected readonly hasError = signal(false);

  protected readonly landingPage = toSignal(
    inject(Api)
      .getLandingPage()
      .pipe(
        catchError((err) => {
          console.error("API error:", err);
          this.hasError.set(true);
          return of(null);
        }),
      ),
  );
}
