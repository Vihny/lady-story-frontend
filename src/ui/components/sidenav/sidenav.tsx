import "./sidenav.scss"

function SideNav() {
    return (
        <>
          <div className="container-sidenav">
            <img src="src/assets/logo-ladystore.png" alt="Logo" />
            <div className="nav-icon">
                <a href="">Dashboard</a>
            </div>
            <div className="nav-icon">
                <a href="">Produtos</a>
            </div>
            <div className="nav-icon">
                <a href="">Settings</a>
            </div>
          </div>
        </>
    )
}

export default SideNav;