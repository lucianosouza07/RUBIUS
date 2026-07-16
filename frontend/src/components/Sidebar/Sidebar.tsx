import { Outlet } from "react-router"
import { Link } from "react-router"

import "./Sidebar.css"

export function Sidebar() {
  return (
    <div className="sidebar-holder">
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item">Dashboard</Link>
          <Link to="/agent" className="nav-item">Agent</Link>
          <Link to="/login" className="nav-item">Autenticar</Link>
        </nav>
      </aside>

    </div>
  );
}

export function Layout() {
	return (
		<div className="layout">
			<Sidebar />
			<main>
				<Outlet />
			</main>
		</div>
	)
}


export default Layout
