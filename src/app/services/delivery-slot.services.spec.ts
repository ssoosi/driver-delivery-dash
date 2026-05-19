import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeliverySlotService } from './delivery-slot.service';

describe('DeliverySlotService', () => {
  let service: DeliverySlotService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeliverySlotService]
    });

    service = TestBed.inject(DeliverySlotService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch delivery slots', () => {
    service.getDeliverySlots().subscribe(response => {
      expect(response.body?.length).toBe(1);
      expect(response.body?.[0].driverName).toBe('John');
    });

    const req = httpMock.expectOne('/mock-data/delivery-slots.json');
    req.flush([{ id: 1, driverName: 'John' }]);
  });
});