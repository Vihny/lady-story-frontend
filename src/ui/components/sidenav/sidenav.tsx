import { Outlet, Link } from "react-router-dom";
import "./sidenav.scss"
import { Grid } from 'react-feather';
import { Briefcase } from 'react-feather';
import { User } from 'react-feather';
import { Settings } from 'react-feather';
import { LogOut } from 'react-feather';

function SideNav() {

    return (
        <>
          <div className="container-sidenav">
            <img src="src/assets/logo-ladystore.png" alt="Logo" />
            <div className="link-navs">
                <div className="nav-icon">
                    <Grid size={24} color='#ffffff'/>
                    <Link to='/dashboard'>Dashboard</Link>
                </div>
                <div className="nav-icon">
                    <Briefcase size={24} color='#ffffff'/>
                    <Link to='/produtos'>Produtos</Link>
                </div>
                <div className="nav-icon">
                    <User size={24} color='#ffffff'/>
                    <Link to='/cadastrar-cliente'>Clientes</Link>
                </div>  
                <div className="nav-icon">
                    <Settings size={24} color='#ffffff'/>
                    <Link to='/settings'>Settings</Link>
                </div> 
                <div className="nav-icon logout">
                    <LogOut size={24} color='#ffffff'/>
                    <Link to='/logout'>Logout</Link>
                </div>  
            </div>
          </div>
          <Outlet />
        </>
    )
}

export default SideNav;