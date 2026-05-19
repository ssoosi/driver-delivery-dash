import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DeliverySlotDashboardComponent } from './components/delivery-slot-dashboard/delivery-slot-dashboard.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    // DeliverySlotDashboardComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('driver-delivery-dashboard');
}