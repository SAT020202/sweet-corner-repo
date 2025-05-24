import React, { useEffect, useState, createContext, useContext } from 'react';
import './css/Navbar.css';
import { getCategories } from '../services/api';

export const RoleContext = createContext();
export const useRole = () => useContext(RoleContext);

const Navbar = () => {
    const [categories, setCategories] = useState([]);
    const { role, setRole } = useRole();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                setCategories(res.data);
            } catch (err) {
                setCategories([]);
            }
        };
        if (role === 'admin') {
            fetchCategories();
        }
    }, [role]);

    useEffect(() => {
        const onStorage = () => setRole(localStorage.getItem('role'));
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img src="/uploads/logo.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
                    <h2 className="mb-0" style={{ fontSize: 24 }}>SweetCorner</h2>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {role === 'admin' && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/produits">PRODUITS</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/categories">CATÉGORIES</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/unites">UNITÉS PRODUIT</a>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="d-flex">
                        {!localStorage.getItem('token') ? (
                            <a href="/login" className="btn btn-outline-primary ms-2">
                                <i className="fa-solid fa-right-to-bracket"></i> Se connecter
                            </a>
                        ) : (
                            <button
                                className="btn btn-outline-danger ms-2"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('role');
                                    setRole(null);
                                    window.location.reload();
                                }}
                            >
                                <i className="fa-solid fa-right-from-bracket"></i> Se déconnecter
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;