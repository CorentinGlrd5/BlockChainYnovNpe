import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-block-page",
  templateUrl: "./block-page.component.html",
  styleUrls: ["./block-page.component.scss"]
})
export class BlockPageComponent implements OnInit {
  @Input()
  public page;

  @Input()
  public selectedPage;
  constructor() {}

  ngOnInit() {}
}
