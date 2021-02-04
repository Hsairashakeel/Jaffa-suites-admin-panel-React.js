import React from 'react';
import Dashboard from './../Dashboard/dashboard'
import LSideBar from './../shared/left_sidebar'
import TopBar from './../shared/top_bar'
import Users from './../users/AllUsers'
import UserDetails from './../users/userDetails'
import Admins from './../Admin/adminsList'
import Login from './../shared/login'
import AdminProfile from './../Admin/profile'
import AllBookings from './../bookings/allBookings'
import BookRoom from './../bookings/bookRoom'
import Gallery from './../gallery/allGallery'
import AddGallery from './../gallery/AddGalleryItem'
import FAQ from './../help/faqs'
import AllRooms from './../rooms/allRooms'
import { Switch, Route, Redirect,withRouter } from 'react-router-dom'
import UserProfile from './../shared/userInfo'
import AddRoom from './../rooms/addRoom'
import AllActivities from './../Dashboard/allActivities'

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}
const Main = withRouter(({location}) => {

  var authed=UserProfile.getName()!=null
    return (
          <div>
            {
              location.pathname!=='/login' &&<TopBar /> 
            }
                {
              location.pathname!=='/login' && <LSideBar />
            }
            
            <Switch>
              <PrivateRoute authed={authed} exact path="/admins" component={()=><Admins />}  />
              <PrivateRoute authed={authed} exact path="/users" component={()=><Users />}  />
              <Route exact path="/login" component={()=><Login />} />
              <PrivateRoute authed={authed} path="/profile" component={()=><AdminProfile />}  />
              <PrivateRoute authed={authed} exact path="/dashboard/allActivities" component={()=><AllActivities/>}  />
              <PrivateRoute authed={authed} path="/dashboard" component={()=><Dashboard />}  />
              <PrivateRoute authed={authed} path="/users/:id" component={(props)=> <UserDetails  {...props}/>} />
              <PrivateRoute authed={authed} path="/admins/:id" component={(props)=><AdminProfile {...props} />}  />
              <PrivateRoute authed={authed} path="/bookings" component={()=><AllBookings/>}  />
              <PrivateRoute authed={authed} path="/bookroom" component={()=><BookRoom />}  />
              <PrivateRoute authed={authed} path="/gallery" component={()=><Gallery />}  />
              <PrivateRoute authed={authed} path="/addgallery" component={()=><AddGallery />}  />
              <PrivateRoute authed={authed} path="/faq" component={()=><FAQ />}  />
              <PrivateRoute authed={authed} exact path="/rooms" component={()=><AllRooms />}  />
              <PrivateRoute authed={authed} path="/rooms/addroom" component={()=><AddRoom />}  />
              <Redirect to="/dashboard" />
            </Switch>
          </div>
    )
  })  

export default Main;
