import logo from "../image/cafeLogo.png";
import "./NavbarStyle.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-center">
          <img src={logo} alt="cafe-logo" className="cafe-logo" />
          <h3>cong-cafe</h3>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
