import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { MatTableDataSource } from '@angular/material/table';

import { DeliverySlotService } from '../../services/delivery-slot.service';
import { DeliverySlot } from '../../models/delivery-slot.model';

@Component({
  selector: 'app-delivery-slot-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  templateUrl: './delivery-slot-dashboard.component.html',
  styleUrls: ['./delivery-slot-dashboard.component.scss']
})
export class DeliverySlotDashboardComponent implements OnInit {

  displayedColumns: string[] = [
    'driverName',
    'slotTime',
    'status',
    'latestActivity',
    'withdrawalReason',
    'updated'
  ];

dataSource = new MatTableDataSource<DeliverySlot>([]);

  loading = false;
  error = false;

  selectedStatus = '';
  searchTerm = '';
  availableCount = 0;
  assignedCount = 0;
  withdrawnCount = 0;

  deliverySlots: DeliverySlot[] = [];

  constructor(
    private deliverySlotService: DeliverySlotService
  ) {}

  ngOnInit(): void {
    this.loadSlots();
  }

loadSlots(): void {

  console.log('loadSlots CALLED');

  this.loading = true;
  this.error = false;

  this.deliverySlotService.getDeliverySlots().subscribe({

    next: (response) => {

      console.log('✅ FULL RESPONSE:', response);

      if (response.ok && response.body) {

        const slots = response.body;

        this.deliverySlots = slots;
        this.dataSource.data = slots;

        this.calculateSummary(slots);

        this.loading = false;

      } else {

        this.error = true;
        this.loading = false;
      }
    },

    error: (err) => {

      console.error('HTTP ERROR:', err);

      this.error = true;
      this.loading = false;
    }
  });
}
applyFilters(): void {

  const filtered = this.deliverySlots.filter(slot => {

    const matchesStatus =
      !this.selectedStatus ||
      slot.status === this.selectedStatus;

    const matchesSearch =
      !this.searchTerm ||
      slot.driverName.toLowerCase().includes(this.searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  this.dataSource.data = filtered;

  this.calculateSummary(filtered); //  update KPIs dynamically
}

  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  calculateSummary(slots: DeliverySlot[]): void {

  this.availableCount = slots.filter(s => s.status === 'Available').length;

  this.assignedCount = slots.filter(s => s.status === 'Assigned').length;

  this.withdrawnCount = slots.filter(s => s.status === 'Withdrawn').length;
}
}