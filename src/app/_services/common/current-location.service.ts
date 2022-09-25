import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CurrentLocationService {

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(response => {
        resolve({ longitude: response.coords.longitude, latitude: response.coords.latitude });
      })
    });
  }
}
