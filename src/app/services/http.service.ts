import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  async doGet(url: any) {
    const options = {
      url: url,
      headers: { 'Content-Type': 'application/json'},
    };

    const response: HttpResponse = await CapacitorHttp.get(options);

    return response;
  }

  async doPost(url: any, formData: any) {

    const options = {
      url: url,
      headers: { 'Content-Type': 'application/json'},
      data: JSON.stringify(formData),
    };

    const response: HttpResponse = await CapacitorHttp.post(options);

    return response;
  }
}
