import { Outlet, NavLink } from "react-router-dom";
import { Grid, Briefcase, User, Settings, LogOut } from "react-feather";
import "./sidenav.scss";

function SideNav() {
    return (
        <div className="container-sidenav">
            <img src="src/assets/logo-ladystore.png" alt="Logo" />
            <div className="link-navs">
                <div className={`nav-icon`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-icon active" : "nav-icon"
                        }
                    >
                        <Grid size={24} color="#ffffff" />
                        Dashboard
                    </NavLink>
                </div>
                <div className={`nav-icon`}>
                    <NavLink
                        to="/produtos"
                        className={({ isActive }) =>
                            isActive ? "nav-icon active" : "nav-icon"
                        }
                    >
                        <Briefcase size={24} color="#ffffff" />
                        Produtos
                    </NavLink>
                </div>
                <div className={`nav-icon`}>
                    <NavLink
                        to="/clientes"
                        className={({ isActive }) =>
                            isActive ? "nav-icon active" : "nav-icon"
                        }
                    >
                        <User size={24} color="#ffffff" />
                        Clientes
                    </NavLink>
                </div>
                <div className={`nav-icon`}>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            isActive ? "nav-icon active" : "nav-icon"
                        }
                    >
                        <Settings size={24} color="#ffffff" />
                        Settings
                    </NavLink>
                </div>
                <div className="nav-icon logout">
                    <LogOut size={24} color="#ffffff" />
                    <NavLink to="/logout">Logout</NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default SideNav;
