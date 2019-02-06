import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing'
import { EmailComposer } from '@ionic-native/email-composer'
import { Diagnostic } from '@ionic-native/diagnostic'
import { Geolocation } from '@ionic-native/geolocation'
import { LaunchNavigator } from '@ionic-native/launch-navigator'

import { HttpProvider } from '../providers/http/http';
import { ConstantProvider } from '../providers/constant/constant';
import { AuthProvider } from '../providers/auth/auth';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        HttpProvider,
        ConstantProvider,
        AuthProvider,
        Network,
        SocialSharing,
        BrowserTab,
        InAppBrowser,
        CallNumber,
        EmailComposer,
        Diagnostic,
        Geolocation,
        LaunchNavigator
    ]
})
export class AppModule { }
