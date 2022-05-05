export const EmploymentFilterItem = props => {
  const {details} = props
  const {employmentTypeId, label} = details
  return (
    <li>
      <input id={employmentTypeId} type="checkbox" />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export const SalaryRangeFilterItem = props => {
  const {details} = props
  const {salaryRangeId, label} = details
  return (
    <li>
      <input id={salaryRangeId} type="checkbox" />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}
