import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Layout } from "./components/layout/layout";

@Component({
  selector: "app-root",
  imports: [Layout, RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {}
