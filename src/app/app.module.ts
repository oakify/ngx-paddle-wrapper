import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { PaddleModule } from 'paddle';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PaddleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
