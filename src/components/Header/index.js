import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <nav>
      <div className="nav-bar-container">
        <Link to="/">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
        <div>
          <Link to="/">
            <AiFillHome />
          </Link>

          <Link to="/jobs">
            <BsFillBriefcaseFill />
          </Link>
          <button type="button" onClick={onClickLogout}>
            <FiLogOut />
          </button>
        </div>
      </div>

      <div className="nav-bar-large-desktop-view-container">
        <Link to="/">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Jobs">Jobs</Link>
          </li>
        </ul>
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
