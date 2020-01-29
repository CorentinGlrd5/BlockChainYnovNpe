import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BlockViewComponent } from "./components/block-view/block-view.component";
import {
  BlockchainViewerComponent,
  DialogOverviewComponent
} from "./pages/blockchain-viewer/blockchain-viewer.component";
import { BlockchainService } from "./services/blockchain.service";
import { HttpClientModule } from "@angular/common/http";
import { BlockPageComponent } from "./components/block-page/block-page.component";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    BlockViewComponent,
    BlockPageComponent,
    BlockchainViewerComponent,
    DialogOverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  entryComponents: [DialogOverviewComponent],
  providers: [BlockchainService],
  bootstrap: [AppComponent]
})
export class AppModule {}
