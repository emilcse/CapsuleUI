import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { OrderModule, OrderPipe } from 'ngx-order-pipe'; // <-- Import OrderModule


@NgModule({
  declarations: [
    AppComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    ReactiveFormsModule,
    OrderModule
  ],

  providers: [OrderPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
