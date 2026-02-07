import { NavLink } from "react-router-dom";

export function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start mt-auto border-top">
            <div className="text-center p-3">
                <span>© {new Date().getFullYear()} Copyright: </span>
                <NavLink className="text-dark text-decoration-none fw-bold" to="/">
                    BCard Project
                </NavLink>
            </div>

            <div className="d-flex justify-content-center gap-3 pb-2">
                <NavLink to="/about" className="text-secondary text-decoration-none">About</NavLink>
                <span className="text-secondary">|</span>
                <span className="text-secondary">Contact Us</span>
            </div>
        </footer>
    );
}