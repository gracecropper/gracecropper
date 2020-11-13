import React from 'react'

const EditUser = props => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        {props.currentUser.isAdmin ? (
          <p>
            Role:{' '}
            <select
              name="role"
              onChange={props.onChange}
              value={props.user.role}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </p>
        ) : (
          ''
        )}
        {props.user.isAdmin ? (
          <p>
            User ID:{' '}
            <input
              type="text"
              name="userId"
              onChange={props.onChange}
              value={props.currentUser.userId}
            />{' '}
          </p>
        ) : (
          ''
        )}
        <p>Email:</p>{' '}
        <input
          readOnly={
            props.currentUser.isAdmin &&
            props.currentUser.userId !== props.user.id
          }
          type="text"
          name="email"
          onChange={props.onChange}
          value={props.currentUser.email}
        />
        <p>{props.currentUser.isAdmin ? 'Admin' : 'Old'} Password:</p>{' '}
        <input
          type="password"
          name="oldPassword"
          onChange={props.onChange}
          value={props.currentUser.oldPassword}
        />
        <p>New Password:</p>{' '}
        <input
          readOnly={
            props.currentUser.isAdmin &&
            props.currentUser.userId !== props.user.id
          }
          type="password"
          name="password"
          onChange={props.onChange}
          value={props.currentUser.password}
        />
        <p>
          <button type="submit">Edit Profile</button>
        </p>
      </form>
    </div>
  )
}

export default EditUser
