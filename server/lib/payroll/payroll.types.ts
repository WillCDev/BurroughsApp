export type PaymentsByMonth = Record<string, PaymentsMap>
export type PaymentsMap = Partial<Record<PaymentType, Date>>
export enum PaymentType {
  'Bonus' = 'bonus',
  'Salary' = 'salary',
}
