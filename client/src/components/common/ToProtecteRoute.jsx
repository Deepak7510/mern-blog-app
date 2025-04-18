import { RouteAdminBlog, RouteAdminCategory, RouteComments, RouteIndex, RouteProfile, RouteSignIn, RouteSignUp, RouteUsers } from '@/helpers/route';
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const ToProtecteRoute = ({user,isAuthenticated,children}) => {
    const location=useLocation();
    
    if(isAuthenticated && (location.pathname===RouteSignIn || location.pathname===RouteSignUp)){
        return <Navigate to={RouteIndex} />
    }

    if(isAuthenticated){
        if(user.role=="user" && (location.pathname===RouteUsers || location.pathname===RouteComments || location.pathname===RouteAdminCategory)){
            return <Navigate to={RouteIndex} />
        }
    }

    if(!isAuthenticated && (location.pathname===RouteProfile || location.pathname===RouteAdminBlog || location.pathname===RouteProfile || location.pathname===RouteUsers || location.pathname===RouteComments || location.pathname===RouteAdminCategory)){
            return <Navigate to={RouteIndex} />
    }

  return <>
  {children}
  </>
}

export default ToProtecteRoute