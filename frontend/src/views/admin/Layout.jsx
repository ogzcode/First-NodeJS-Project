import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'
import Sidebar from '../../components/Sidebar'

import { adminMenu } from '../../utils/menuData'

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar onChangeMenu={() => setSidebarOpen(!sidebarOpen)} />
            <div className="flex">
                <Sidebar isOpen={sidebarOpen} menu={adminMenu} />
                <div className="bg-stone-50 w-full overflow-y-auto" style={{ height: "calc(100vh - 4rem)" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}