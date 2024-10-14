import "./sidenav.scss"
import { Grid } from 'react-feather';
import { Briefcase } from 'react-feather';
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
                    <a href="">Dashboard</a>
                </div>
                <div className="nav-icon">
                    <Briefcase size={24} color='#ffffff'/>
                    <a href="">Produtos</a>
                </div>
                <div className="nav-icon">
                    <Settings size={24} color='#ffffff'/>
                    <a href="">Settings</a>
                </div> 
                <div className="nav-icon logout">
                    <LogOut size={24} color='#ffffff'/>
                    <a href="">Logout</a>
                </div>  
            </div>
          </div>
        </>
    )
}

export default SideNav;