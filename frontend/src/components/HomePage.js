import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/HomePage.css';
import { useRole } from './Navbar';
import axios from 'axios';

const HomePage = () => {
    const { role } = useRole();
    const [categories, setCategories] = useState([]);
    const [produitsByCategorie, setProduitsByCategorie] = useState({});

    useEffect(() => {
        const fetchCategoriesAndProducts = async () => {
            try {
                const catRes = await axios.get('http://127.0.0.1:8000/api/categories');
                setCategories(catRes.data);

                // Pour chaque catégorie, récupérer ses produits
                const produitsObj = {};
                for (const categorie of catRes.data) {
                    const prodRes = await axios.get(`http://127.0.0.1:8000/api/categories/${categorie.idCategorie}/produits`);
                    produitsObj[categorie.idCategorie] = prodRes.data;
                }
                setProduitsByCategorie(produitsObj);

                // LOGS pour debug
                console.log('Catégories:', catRes.data);
                console.log('Produits par catégorie:', produitsObj);
            } catch (e) {
                setCategories([]);
                setProduitsByCategorie({});
            }
        };
        fetchCategoriesAndProducts();
    }, []);

    return (
        <div>

            <main className="content">
                <br></br>
                {role === 'admin' && (<>
                    <h2>Bonjour Admin, bienvenue sur SweetCorner !</h2>
                    <p>Gérer les catégories et les produits.</p>
                </>)}
                {role === 'client' && (<>
                    <h2>Bonjour Client, bienvenue sur SweetCorner !</h2>
                    <p>Découvrez nos délicieuses catégories de produits !</p>
                </>)}
                {!role && (<>
                    <h2>Bienvenue sur SweetCorner !</h2>
                    <p>Découvrez nos délicieuses catégories de produits !</p>
                </>)}
                <br></br>
                {categories.length === 0 && (
                    <p>Chargement...</p>
                )}
                {categories.map(cat => (
                    <section key={cat.idCategorie} className="categorie-section">
                    <h3>
                    {cat.nom}
                    <span className="nombre-produits-badge">
                        {(produitsByCategorie[cat.idCategorie] || []).length} produits
                    </span>
                    </h3>
                    <br></br>              
                    <div className="produits-carousel">
                            {(produitsByCategorie[cat.idCategorie] || []).length === 0 && (
                                <span style={{ color: '#888' }}>En cours...</span>
                            )}
                            {(produitsByCategorie[cat.idCategorie] || []).map(prod => (
                                <Link
                                    to={`/produitss/${prod.idProduit}`}
                                    state={{ from: window.location.pathname }}
                                    className="produit-card"
                                    key={prod.idProduit}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <img src={`http://127.0.0.1:8000/${prod.image}`} alt={prod.nom} />
                                    <div className="produit-nom">{prod.nom}</div>
                                    <div className="produit-prix">{prod.prix} MAD</div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
};

export default HomePage;