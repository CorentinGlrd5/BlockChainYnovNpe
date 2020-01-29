import { Component, OnInit, Inject, Input } from "@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: "app-blockchain-viewer",
  templateUrl: "./blockchain-viewer.component.html",
  styleUrls: ["./blockchain-viewer.component.scss"]
})
@Injectable()
export class BlockchainViewerComponent implements OnInit {
  public blocks = [];
  public selectedBlock = null;

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.initBlocks();
    this.selectedBlock = this.blocks[0];
    // console.log(this.blocks);
  }

  ngOnInit() {}
  initBlocks() {
    this.http.get("http://localhost:5000/chain").subscribe(res => {
      this.blocks = res as JSON[];
    });
  }
  showTransactions(block) {
    // console.log(block);
    this.selectedBlock = block;
    return false;
  }

  blockHasTx(block) {
    return block.pages.length > 0;
  }

  selectedBlockHasTx() {
    return this.blockHasTx(this.selectedBlock);
  }

  isSelectedBlock(block) {
    return this.selectedBlock === block;
  }

  getBlockNumber(block) {
    return this.blocks.indexOf(block) + 1;
  }

  showPages(): void {
    this.dialog.open(DialogOverviewComponent, {
      width: "250px",
      data: {}
    });
  }
}

@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "dialog-overview-example.html"
})
export class DialogOverviewComponent implements OnInit {
  public blocks = [];
  public selectedBlock = null;

  @Input()
  public page;

  @Input()
  public selectedPage;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient
  ) {
    this.initBlocks();
    this.selectedBlock = this.blocks[0];
    // console.log(this.blocks);
  }

  ngOnInit() {}
  initBlocks() {
    this.http.get("http://localhost:5000/chain").subscribe(res => {
      this.blocks = res as JSON[];
    });
  }
  showTransactions(block) {
    // console.log(block);
    this.selectedBlock = block;
    return false;
  }

  blockHasTx(block) {
    return block.pages.length > 0;
  }

  selectedBlockHasTx() {
    return this.blockHasTx(this.selectedBlock);
  }

  isSelectedBlock(block) {
    return this.selectedBlock === block;
  }

  getBlockNumber(block) {
    return this.blocks.indexOf(block) + 1;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
