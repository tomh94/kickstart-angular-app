import { Component } from "@angular/core";
import { Divider } from "../divider/divider";
import { Logo } from "../logo/logo";
import { Navigation } from "../navigation/navigation";

@Component({
  selector: "app-footer",
  imports: [Divider, Navigation, Logo],
  templateUrl: "./footer.html",
  styleUrl: "./footer.css",
})
export class Footer {}
