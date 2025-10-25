import { Container } from '@/shared/components/Container'

export const AvailableData = () => {
  return (
    <Container className="mt-8 mb-16">
      <div className="not-prose rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          Available information for each person:
        </h4>
        <div className="grid grid-cols-1 gap-2 text-sm text-gray-700 md:grid-cols-2 dark:text-gray-300">
          <div>
            <strong>Name</strong> - Full name of the person
          </div>
          <div>
            <strong>Province</strong> - The region where they live
          </div>
          <div>
            <strong>Birth year</strong> - Year they were born
          </div>
          <div>
            <strong>Total earnings</strong> - Complete annual income
          </div>
          <div>
            <strong>Salary income</strong> - Income from employment
          </div>
          <div>
            <strong>Investment income</strong> - Income from investments
          </div>
          <div>
            <strong>Tax rate</strong> - The tax rate they pay
          </div>
          <div>
            <strong>Income after tax</strong> - Net income after taxes
          </div>
          <div>
            <strong>Tax refunds</strong> - Any tax refunds received
          </div>
          <div>
            <strong>National ranking</strong> - Position among all high-earners
          </div>
          <div className="md:col-span-1">
            <strong>Province ranking</strong> - Position within their province
          </div>
        </div>
      </div>
    </Container>
  )
}
