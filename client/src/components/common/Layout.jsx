import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider } from '../ui/sidebar'
import AppSidebar from './AppSidebar'
import Topbar from './Topbar'
import Footer from './Footer'

const Layout = () => {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <main className='w-full'>
            <Topbar/>
                <div className='w-full min-h-[calc(100vh-40px)]'>
                <Outlet />
                </div>
                <Footer/>
            </main>
        </SidebarProvider>
    )
}

export default Layout