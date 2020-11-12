import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, editUser, getSingleUser} from '../store'

class SingleUser extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      oldPassword: '',
      isAdmin: false,
      role: 'User',
      userId: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.me()
    this.setState({
      email: this.props.user.email,
      isAdmin: this.props.user.role === 'Admin',
      userId: this.props.user.id
    })
    if (this.props.user.role === 'Admin' && this.props.match.params.id) {
      await this.props.getSingleUser(this.props.match.params.id)
      this.setState({
        role: this.props.user.role,
        email: this.props.user.email,
        userId: this.props.match.params.id
      })
    }
  }
  componentWillUnmount() {
    this.props.me()
  }
  onChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  onSubmit(evt) {
    evt.preventDefault()
    this.props.editUser(this.state)
    this.setState({
      email: '',
      oldPassword: '',
      password: ''
    })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.isAdmin ? (
            <p>
              Role:{' '}
              <select
                name="role"
                onChange={this.onChange}
                value={this.state.role}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </p>
          ) : (
            ''
          )}
          {this.state.isAdmin ? (
            <p>
              User ID:{' '}
              <input
                type="text"
                name="userId"
                onChange={this.onChange}
                value={this.state.userId}
              />{' '}
            </p>
          ) : (
            ''
          )}
          <p>Email:</p>{' '}
          <input
            readOnly={
              this.state.isAdmin && this.state.userId !== this.props.user.id
            }
            type="text"
            name="email"
            onChange={this.onChange}
            value={this.state.email}
          />
          <p>{this.state.isAdmin ? 'Admin' : 'Old'} Password:</p>{' '}
          <input
            type="password"
            name="oldPassword"
            onChange={this.onChange}
            value={this.state.oldPassword}
          />
          <p>New Password:</p>{' '}
          <input
            readOnly={
              this.state.isAdmin && this.state.userId !== this.props.user.id
            }
            type="password"
            name="password"
            onChange={this.onChange}
            value={this.state.password}
          />
          <p>
            <button type="submit">Edit Profile</button>
          </p>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    editUser: body => dispatch(editUser(body)),
    me: () => dispatch(me()),
    getSingleUser: id => dispatch(getSingleUser(id))
  }
}
export default connect(mapState, mapDispatch)(SingleUser)
