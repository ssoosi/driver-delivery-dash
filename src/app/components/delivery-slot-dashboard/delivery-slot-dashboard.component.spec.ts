import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliverySlotDashboardComponent  } from './delivery-slot-dashboard.component';

describe('DeliverySlotDashboard', () => {
  let component: DeliverySlotDashboardComponent ;
  let fixture: ComponentFixture<DeliverySlotDashboardComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverySlotDashboardComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliverySlotDashboardComponent );
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
