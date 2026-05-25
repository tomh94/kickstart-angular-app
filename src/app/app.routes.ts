import type { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: async () =>
      import("./pages/landing-page/landing-page").then((m) => m.LandingPage),
  },
];
