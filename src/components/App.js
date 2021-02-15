import Signup from './authetication/Signup'
import {AuthProvider} from '../contexts/AuthContext'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Profile from './authetication/Profile'
import Login from './authetication/Login'
import PrivateRoute from './authetication/PrivateRoute'
import ForgotPassword from './authetication/ForgotPassword'
import UpdateProfile from './authetication/UpdateProfile'
import Dashboard from './drive/Dashboard'

function App() {
  return (
    <Router>
      <AuthProvider>
          <Switch>
            <PrivateRoute exact path = "/" component = {Dashboard}></PrivateRoute>
            <PrivateRoute exact path = "/folder/:folderId" component = {Dashboard}></PrivateRoute>
            <PrivateRoute path = '/user' component = {Profile}></PrivateRoute>
            <PrivateRoute path = '/update-profile' component = {UpdateProfile}></PrivateRoute>
            <Route path = '/signup' component = {Signup}></Route>
            <Route path = '/login' component = {Login}></Route>
            <Route path = '/forgot-password' component = {ForgotPassword}></Route>
          </Switch>
        </AuthProvider>
    </Router>
          
  )
}

export default App;
