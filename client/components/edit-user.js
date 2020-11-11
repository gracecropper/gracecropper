import React from 'react'

const EditUser = props => {
  return (
    <form className="updateForm" onSubmit={props.handleSubmit}>
      <label htmlFor="Update User">
        <h2>Update User</h2>
      </label>

      <label>Email:</label>
      <input
        type="text"
        name="email"
        placeholder="Email"
        onChange={props.handleChange}
        value={props.updates.email}
      />
      <label>Role:</label>

      {/* <label>
                Password:
                </label>
            <input
                type='text'
                name='password'
                placeholder='Password'
                onChange={props.handleChange}
                value={props.updates.password}
            /> */}
      <input type="submit" value="Submit" className="submitButton" />
    </form>
  )
}

export default EditUser
//if user role === admin, they can update email and role

//if user role === user, they can update their email and password....
