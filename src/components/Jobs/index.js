import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import ProfileSection from '../ProfileSection'
import JobsSection from '../JobsSection'
import {EmploymentFilterItem, SalaryRangeFilterItem} from '../FilterGroups'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  renderTypeOfEmploymentField = () => (
    <ul>
      {employmentTypesList.map(eachType => (
        <EmploymentFilterItem
          key={eachType.employmentTypeId}
          details={eachType}
        />
      ))}
    </ul>
  )

  renderSalaryRangeField = () => (
    <ul>
      {salaryRangesList.map(eachRange => (
        <SalaryRangeFilterItem
          key={eachRange.salaryRangeId}
          details={eachRange}
        />
      ))}
    </ul>
  )

  render() {
    return (
      <div>
        <Header />
        <div>
          <input type="search" placeholder="Search" />

          <button type="button" testid="searchButton">
            <BsSearch className="search-icon" />
          </button>

          <ProfileSection />
          <hr />
          {this.renderTypeOfEmploymentField()}
          <hr />
          {this.renderSalaryRangeField()}
          <hr />
          <JobsSection />
        </div>
      </div>
    )
  }
}

export default Jobs
