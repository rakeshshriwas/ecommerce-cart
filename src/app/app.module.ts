import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { ProductsCartListComponent } from './photo-cart-list/photo-cart-list.component';
import { PhotoService } from './services/photo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { photoReducers } from './ngrx/reducers/photo.reducres';
import { PhotoEffects } from './ngrx/effects/photo.effects';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [AppComponent, PhotoListComponent, ProductsCartListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ products: photoReducers }),
    EffectsModule.forRoot([PhotoEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 50,
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule
  ],
  providers: [PhotoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
