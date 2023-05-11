import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContext } from './UserProvider'

type Props = {}

export const ProtectedRoute = (props: Props) => {

    const { currentUser, isLoading } = useContext(UserContext)

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    else if (!currentUser || currentUser === 'Guest') {
        return <Navigate to="/login" />
    }
    return (
        <Outlet />
    )
}