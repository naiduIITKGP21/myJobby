import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errMsg: '',
  }

  onChangeUsernameInput = event => this.setState({username: event.target.value})

  onChangePasswordInput = event => this.setState({password: event.target.value})

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsernameInput}
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePasswordInput}
        />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errMsg => this.setState({showSubmitError: true, errMsg})

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <div>{this.renderUsernameField()}</div>
          <div>{this.renderPasswordField()}</div>
          {showSubmitError && <p>{errMsg}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login
