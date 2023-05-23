import useUser from '../../hooks/useUser'

export const Dashboard = () => {
  const { user } = useUser()
  console.log(user)
  return <main className="dashboard"></main>
}
