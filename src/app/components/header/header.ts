import { Component } from "@angular/core";
import { Container } from "../container/container";
import { Logo } from "../logo/logo";
import { Navigation } from "../navigation/navigation";

@Component({
  selector: "app-header",
  imports: [Logo, Navigation, Navigation, Container],
  templateUrl: "./header.html",
  styleUrl: "./header.css",
})
export class Header {}
