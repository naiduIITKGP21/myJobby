import {Link} from 'react-router-dom'

const JobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  const salary = packagePerAnnum.split(' ')[0]

  return (
    <Link to={`/jobs/${id}`}>
      <li>
        <div>
          <div>
            <img alt="" src={companyLogoUrl} />
            <div>
              <h1>{title}</h1>
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
          <h2>Description</h2>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
