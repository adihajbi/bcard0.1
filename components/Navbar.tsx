import { NavLink, useNavigate } from "react-router-dom";
import { useSearch } from "../SearchContext";
import { useTheme } from "../ThemeContext";
import { getUser, logout } from "../services/userService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export function Navbar() {
    const navigate = useNavigate();
    const { setSearch } = useSearch();
    const { darkMode, toggleDarkMode } = useTheme();
    const [user, setUser] = useState<any>(null);

  
    useEffect(() => {
        const currentUser = getUser();
        setUser(currentUser);
    }, []);

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        setUser(null);
        navigate("/login");
        window.location.reload(); 
    };

    return (
        <nav className={`navbar navbar-expand-lg shadow-sm ${darkMode ? "navbar-dark bg-dark" : "navbar-dark bg-primary"}`}>
            <div className="container">
                <NavLink className="navbar-brand fw-bold" to="/">
                    BCard <i className="bi bi-card-heading"></i>
                </NavLink>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="d-flex mx-auto col-12 col-lg-6" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search cards..."
                            aria-label="Search"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>

                    <div className="d-flex align-items-center">
                        <button className="btn btn-link text-light me-3" onClick={toggleDarkMode}>
                            {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-fill"></i>}
                        </button>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            {user && (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/fav-cards">Fav Cards</NavLink>
                                    </li>

                                    {(user.isBusiness || user.isAdmin) && (
                                        <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/create-card">Create Card</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/my-cards">My Cards</NavLink>
                                            </li>
                                        </>
                                    )}

                                    {user.isAdmin && (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/sandbox">Sandbox</NavLink>
                                        </li>
                                    )}
                                </>
                            )}

                            {!user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/login">Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/register">Register</NavLink>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item">
                                    <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}