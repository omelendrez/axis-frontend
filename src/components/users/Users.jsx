const Row = ({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.full_name}</td>
      <td>{user.role_name}</td>
      <td><button type="button" className="small">Edit</button></td>
    </tr>
  )
}

export const Users = ({ users }) => {
  return (
    <table role="grid">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Full name</th>
          <th scope="col">Role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) =>
          <Row user={user} key={user.id} />
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5}><center>{`${users.length} records found`}</center></td>
        </tr>
      </tfoot>
    </table>
  )
}
