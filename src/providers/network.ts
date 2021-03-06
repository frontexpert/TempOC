import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';

// declare var Connection;

@Injectable()
export class NetState {

    onDevice: boolean;

    constructor(public platform: Platform, private network: Network) {
        this.onDevice = this.platform.is('cordova');
    }

    isOnline(): boolean {
        if (this.onDevice) // && Network.type)
        {
            return true; //Network.type != 'none';
        } else {
            return navigator.onLine;
        }
    }

    isOffline(): boolean {
        if (this.onDevice)//&& Network.type)
        {
            return true; //false //Network.type == 'none';
        } else {
            return !navigator.onLine;
        }
    }

    watchOnline(): any {
        return this.network.onConnect();
    }

    watchOffline(): any {
        return this.network.onDisconnect();
    }

}