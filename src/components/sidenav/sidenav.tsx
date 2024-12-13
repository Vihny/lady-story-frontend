import { Outlet, NavLink } from "react-router-dom";
import { Grid, Briefcase, User, LogOut, CreditCard, ShoppingBag, Archive } from "react-feather";
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
                        to="/financeiro"
                        className={({ isActive }) =>
                            isActive ? "nav-icon active" : "nav-icon"
                        }
                    >
                        <CreditCard size={24} color="#ffffff" />
                        Financeiro
                    </NavLink>
                </div>
                <div className={`nav-icon`}>
                    <NavLink
                        to="/estoque"
                        className={({ isActive }) =>
                            isActive ? "nav-icon active" : "nav-icon"
                        }
                    >
                        <Archive size={24} color="#ffffff" />
                        Estoque
                    </NavLink>
                </div>
                <div className={`nav-icon`}>
                    <NavLink
                        to="/vendas"
                        className={({ isActive }) =>
                            isActive ? "nav-icon active" : "nav-icon"
                        }
                    >
                        <ShoppingBag size={24} color="#ffffff" />
                        Vendas
                    </NavLink>
                </div>
                <div className="nav-icon logout">
                    <NavLink to="/logout">
                    <LogOut size={24} color="#ffffff" />
                    Logout
                    </NavLink>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default SideNav;
