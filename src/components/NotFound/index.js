import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div>
      <img
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      />
      <h1>Page Not Found</h1>
      <p>we{`'`}re sorry, the page you requested could not found</p>
    </div>
  </>
)

export default NotFound
