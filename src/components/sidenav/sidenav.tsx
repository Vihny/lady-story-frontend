import { Outlet, NavLink } from "react-router-dom";
import { Grid, Briefcase, User, Users, LogOut, CreditCard, ShoppingBag, Archive } from "react-feather";
import "./sidenav.scss";

interface SideNavProps {
    handleNavigation: (path: string) => void;
}

function SideNav({ handleNavigation }: SideNavProps) {
    return (
        <div className="container-sidenav">
            <img src="src/assets/logo-ladystore.png" alt="Logo" />
            <div className="link-navs">
                <div className={`nav-icon`}>
                    <NavLink
                        to="/"
                        onClick={() => handleNavigation('/')}
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
                        onClick={() => handleNavigation('/produtos')}
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
                        onClick={() => handleNavigation('/clientes')}
                        className={({ isActive }) =>
                            isActive ? "nav-icon active" : "nav-icon"
                        }
                    >
                        <Users size={24} color="#ffffff" />
                        Clientes
                    </NavLink>
                </div>
                <div className={`nav-icon`}>
                    <NavLink
                        to="/financeiro"
                        onClick={() => handleNavigation('/financeiro')}
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
                        onClick={() => handleNavigation('/estoque')}
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
                        to="/fornecedor"
                        onClick={() => handleNavigation('/fornecedor')}
                        className={({ isActive }) =>
                            isActive ? "nav-icon active" : "nav-icon"
                        }
                    >
                        <User size={24} color="#ffffff" />
                        Fornecedor
                    </NavLink>
                </div>
                <div className={`nav-icon`}>
                    <NavLink
                        to="/vendas"
                        onClick={() => handleNavigation('/vendas')}
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
