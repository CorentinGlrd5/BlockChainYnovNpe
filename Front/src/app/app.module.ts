import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BlockViewComponent } from "./components/block-view/block-view.component";
import { BlockchainViewerComponent } from "./pages/blockchain-viewer/blockchain-viewer.component";

import { BlockchainService } from "./services/blockchain.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent, BlockViewComponent, BlockchainViewerComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],
  providers: [BlockchainService],
  bootstrap: [AppComponent]
})
export class AppModule {}
