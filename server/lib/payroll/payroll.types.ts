export type PaymentsByMonth = Record<string, PaymentsMap>
export type PaymentsMap = Partial<Record<PaymentType, string>>
export enum PaymentType {
  'Bonus' = 'bonus',
  'Salary' = 'salary',
}
