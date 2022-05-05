import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {v4} from 'uuid'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import SimilarJobComp from '../SimilarJobComp'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
console.log(apiStatusConstants)

class JobItemDetails extends Component {
  state = {
    itemDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    console.log('componentDidMout')
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    console.log('Hi Darling')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      console.log(response)
      const fetchedData = await response.json()
      const updatedJobDetails = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
      }

      const upDatedSkills = fetchedData.job_details.skills.map(eachSkill => ({
        id: v4(),
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const updatedLifeAtCompany = {
        description: fetchedData.job_details.life_at_company.description,
        imageUrl: fetchedData.job_details.life_at_company.image_url,
      }

      const updatedSimilarJobs = fetchedData.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      const updatedData = {
        jobDetails: updatedJobDetails,
        skills: upDatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        similarJobs: updatedSimilarJobs,
      }

      this.setState({
        itemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {itemDetails} = this.state
    const {jobDetails, lifeAtCompany} = itemDetails
    const {
      companyLogoUrl,

      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails

    const salary = packagePerAnnum.split(' ')[0]

    const {description, imageUrl} = lifeAtCompany
    console.log('render')

    return (
      <div>
        <div>
          <div>
            <img alt="website logo" src={companyLogoUrl} />
            <div>
              <h1>title</h1>
              <p>{rating}</p>
            </div>
          </div>

          <div>
            <div>
              <p>
                <span>l</span>
                {location}
              </p>
              <p>
                <span>e</span>
                {employmentType}
              </p>
            </div>
            <p>{salary}LPA</p>
          </div>
          <hr />
          <div>
            <h2>Description</h2>
            <button type="button">Visit</button>
          </div>
          <p>{jobDescription}</p>
          {this.renderSkills()}
          <h1>Life at Company</h1>
          <p>{description}</p>
          <img alt="ina" src={imageUrl} />
        </div>
      </div>
    )
  }

  renderSkills = () => {
    const {itemDetails} = this.state
    const {skills} = itemDetails
    return (
      <>
        <h1>Skills</h1>
        <ul>
          {skills.map(eachSkill => (
            <li key={eachSkill.id}>
              <img alt={eachSkill.name} src={eachSkill.imageUrl} />
              <p>{eachSkill.name}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderSimilarJob = () => {
    const {itemDetails} = this.state
    const {similarJobs} = itemDetails
    return (
      <ul>
        {similarJobs.map(eachJob => (
          <SimilarJobComp key={eachJob.id} details={eachJob} />
        ))}
      </ul>
    )
  }

  renderSuccessView = () => (
    <>
      {this.renderJobDetails()}
      <h1>similar Jobs</h1>
      <div>
        <ul>{this.renderSimilarJob()}</ul>
      </div>
    </>
  )

  renderFailureView = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button">Retry</button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        {this.renderView()}
      </div>
    )
  }
}

export default JobItemDetails
