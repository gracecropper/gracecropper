import React, {Component} from 'react'
import {connect} from 'react-redux'
import {me, editUser, getSingleUser} from '../../store'
import {default as EditUser} from './edit-user'

class SingleUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      oldPassword: '',
      isAdmin: false,
      role: 'User',
      userId: '',
      loggedInUserId: -1
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.me()
    this.setState({
      email: this.props.user.email,
      isAdmin: this.props.user.role === 'Admin',
      userId: this.props.user.id,
      loggedInUserId: this.props.user.id
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
        <h3 style={{paddingBottom: '25px'}}>Edit Profile</h3>
        <EditUser
          onChange={this.onChange}
          user={this.props.user}
          currentUser={this.state}
          onSubmit={this.onSubmit}
        />
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
    editUser: (id, body) => dispatch(editUser(id, body)),
    me: () => dispatch(me()),
    getSingleUser: id => dispatch(getSingleUser(id))
  }
}
export default connect(mapState, mapDispatch)(SingleUser)
