import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { PhotoService } from './services/photo.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    PhotoLibrary,
    File,
    WebView,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PhotoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
