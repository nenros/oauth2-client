import {Navbar as NavbarBootstrap, NavbarBrand, NavLink} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavbarToggle from "react-bootstrap/NavbarToggle";

const Navbar = () => {
const loginUrl = "http://localhost:8080/oauth2/authorize?response_type=code&"
    + "response_mode=form_post&"
    + "client_id=front&"
    + "redirect_uri=http://localhost:3000/authorized&"
    + "scope=timetable.read&"
    + "state=xyzABC123"

    return <NavbarBootstrap>
        <NavbarBrand href="/">Train timetable</NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
            <NavLink href="/profile">Profile</NavLink>
            <NavLink href="/logout">Logout</NavLink>
            <NavLink href="/register">Register</NavLink>
            <NavLink href={loginUrl}>Login</NavLink>
        </NavbarCollapse>
    </NavbarBootstrap>
}

export default Navbar;
