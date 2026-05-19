export type DriverStatus =
  | 'Available'
  | 'Assigned'
  | 'Withdrawn'
  | 'Unavailable';

export type WithdrawalReason =
  | 'Sick'
  | 'Accident'
  | 'Vehicle Issue'
  | 'Personal Emergency'
  | 'Other';

export interface DeliverySlot {
  id: number;
  driverName: string;
  slotTime: string;
  status: DriverStatus;
  latestActivity: string;
  latestActivityTimestamp: string;
  withdrawalReason?: WithdrawalReason;
}