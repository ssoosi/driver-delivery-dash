import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { DeliverySlot } from '../models/delivery-slot.model';

@Injectable({
  providedIn: 'root'
})
export class DeliverySlotService {

  constructor(private http: HttpClient) {}

  getDeliverySlots(): Observable<HttpResponse<DeliverySlot[]>> {

    return this.http.get<DeliverySlot[]>(
      '/mock-data/delivery-slots.json',
      {
        observe: 'response' as const 
      }
    ).pipe(
      delay(1200)
    );
  }
}