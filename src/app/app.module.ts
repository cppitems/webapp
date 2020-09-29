import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarComponent } from './menubar/menubar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { ItemviewComponent } from './itemview/itemview.component';
import {MatIconModule} from '@angular/material/icon';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ResultsComponent } from './results/results.component';
import {BrowserinfoComponent} from './browserinfo/browserinfo.component';
import {ReferencesComponent} from './references/references.component';
import { UseroptionsComponent } from './useroptions/useroptions.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
import {MatRadioModule} from '@angular/material/radio';
import {MatListModule} from '@angular/material/list';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
@NgModule({
  declarations: [
    UseroptionsComponent,
    BrowserinfoComponent,
    ReferencesComponent,
    AppComponent,
    MenubarComponent,
    HomeComponent,
    ItemviewComponent,
    ResultsComponent
  ],
  imports: [
    OrderModule,
    MatListModule,
    MatRadioModule,
    MatSliderModule,
    MatMenuModule,
    NoopAnimationsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatToolbarModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
