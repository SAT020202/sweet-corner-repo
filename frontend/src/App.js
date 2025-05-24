import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar, { RoleContext } from './components/Navbar';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import CreerCompte from './components/creerCompte';
import Categories from './components/Categories';
import EditCategorie from './components/EditCategorie';
import Produits from './components/Produits';
import ProduitDetails from './components/ProduitsDetails';
import AjouterProduit from './components/AjouterProduit';
import EditProduit from './components/EditProduit';
import UnitesProduit from './components/UnitesProduit';
import DetailsProduits from './components/DetailsProduits';


function App() {
    const [role, setRole] = useState(localStorage.getItem('role')); // Ajoute useState ici
    return (
        <RoleContext.Provider value={{ role, setRole }}>
            <Router>
            <div className="App">
                    <Navbar />
                    <Routes>    
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/creerCompte" element={<CreerCompte />} />

                        {/* Routes ADMIN */}
                        {role === 'admin' && (
                            <>
                                <Route path="/categories" element={<Categories />} />
                                <Route path="/categories/edit/:id" element={<EditCategorie />} />
                                <Route path="/produits/ajouter" element={<AjouterProduit />} />
                                <Route path="/produits/edit/:id" element={<EditProduit />} />
                                <Route path="/unites" element={<UnitesProduit />} />
                            </>
                        )}

                       
                        {/* Routes accessibles à tous */}
                        <Route path="/produits" element={<Produits />} />
                        <Route path="/produits/:id" element={<ProduitDetails />} />
                        <Route path="/produitss/:id" element={<DetailsProduits />} />

                </Routes>
                    
                </div>
        </Router>   

        </RoleContext.Provider>
        
    );
}

export default App;