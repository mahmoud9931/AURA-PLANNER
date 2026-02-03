import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import Header from './components/Header/Header'
import Indoor from './components/indoor/Indoor'
import Outdoor from './components/outdoor/Outdoor'
import Login from './components/Login/Login'
import SignUp from './components/Signup/SignUp'
import Planners from './components/planners/Planners'
import Wedding from './components/Wedding/Wedding'
import Graduation from './components/Graduation/Graduation'
import Birthday from './components/Birthday/Birthday'
import Special from './components/Special/Special'
import Home from './components/Home/Home'
import About from './components/About/About'



let router = createBrowserRouter([
  { path: '', element: <Home /> },
  { path: 'signup', element: <SignUp /> },
  { path: 'login', element: <Login /> },
  { path: 'indoor', element: <Indoor /> },
  { path: 'outdoor', element: <Outdoor /> },
  { path: 'palnners', element: <Planners /> },
  { path: 'wedding', element: <Wedding /> },
  { path: 'graduation', element: <Graduation /> },
  { path: 'birthday', element: <Birthday /> },
  { path: 'special', element: <Special /> },
  { path: '*', element: <Home /> },
])

function App() {


  return (
    <>

      <RouterProvider router={router} />

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
