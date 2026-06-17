import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './App.css'

import Header from './components/Header/Header'
import Indoor from './components/indoor/Indoor'
import Outdoor from './components/outdoor/Outdoor'
import Login from './components/Login/Login'
import SignUp from './components/Signup/SignUp'
import Planners from './components/planners/Planners'
import Planner from './components/planner details/Planner'
import Wedding from './components/Wedding/Wedding'
import Graduation from './components/Graduation/Graduation'
import Birthday from './components/Birthday/Birthday'
import Special from './components/Special/Special'
import Home from './components/Home/Home'
import VenuesDetails from './components/venuesDetails/VenuesDetails'
import ChatBot from './components/ChatBot/ChatBot'
import BookingsTable from './components/admin/BookingsTable'
import PlannerDashboard from './components/PlannerDashboard/PlannerDashboard'

function AdminRoute() {
    const isAdmin = localStorage.getItem('role') === 'admin' && localStorage.getItem('token');
    return isAdmin ? <BookingsTable /> : <Navigate to="/login" replace />;
}

function PlannerRoute() {
    const isPlanner = localStorage.getItem('role') === 'planner' && localStorage.getItem('token');
    return isPlanner ? <PlannerDashboard /> : <Navigate to="/login" replace />;
}




let router = createBrowserRouter([
    { path: '', element: <Home /> },
    { path: 'signup', element: <SignUp /> },
    { path: 'login', element: <Login /> },
    { path: 'indoor', element: <Indoor /> },
    { path: 'outdoor', element: <Outdoor /> },
    { path: 'palnners', element: <Planners /> },
    { path: 'palnners/:id', element: <Planner /> },
    { path: 'wedding', element: <Wedding /> },
    { path: 'graduation', element: <Graduation /> },
    { path: 'birthday', element: <Birthday /> },
    { path: 'special', element: <Special /> },
    { path: '/venues/:type/:id', element: <VenuesDetails /> },
    { path: 'dashboard', element: <AdminRoute /> },
    { path: 'planner-dashboard', element: <PlannerRoute /> },
    { path: '*', element: <Home /> },
])

function App() {


    return (
        <>
            <RouterProvider router={router} />
            <ChatBot />

            {/* <Header/> */}
            {/* <Planners /> */}
            {/* <Login />
      <SignUp/> */}
            {/* <Home/> */}
            {/* <About/> */}
        </>
    )
}

export default App
