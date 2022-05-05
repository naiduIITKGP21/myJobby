const SimilarJobComp = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = details

  return (
    <li>
      <div>
        <img alt="website logo" src={companyLogoUrl} />
        <div>
          <h1>{title}</h1>
          <p>{rating}</p>
        </div>
      </div>
      <hr />
      <h2>Description</h2>
      <p>{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobComp
