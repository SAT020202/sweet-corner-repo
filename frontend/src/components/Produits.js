import React, { useState, useEffect } from 'react';
import { getProduits, deleteProduit } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './css/Produits.css';

const Produits = () => {
    const [produits, setProduits] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await getProduits();
                setProduits(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits :', error);
            }
        };
        fetchProduits();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Supprimer ce produit ?")) {
            try {
                await deleteProduit(id);
                setProduits(produits.filter(p => (p.idProduit || p.id) !== id));
            } catch (e) {
                alert("Erreur lors de la suppression");
            }
        }
    };

    const role = localStorage.getItem('role'); // Ajoute ceci en haut du composant

    return (
        <div className="container mt-3">
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 mb-4 w-100">
    <div className="w-100 d-flex justify-content-center">
        <h1 className="mb-0 text-center w-100">
            <span className="emoji">🍭</span> Nos Délices Sucrés <span className="emoji">🍬</span>
        </h1>
    </div>
    {role === 'admin' && (
        <div className="w-100 d-flex justify-content-center">
            <button
                className="btn btn-primary"
                onClick={() => navigate('/produits/ajouter')}
            >
                <i className="fas fa-plus"></i> Ajouter
            </button>
        </div>
    )}
</div>
            <div className="row">
                {produits.map((produit) => (
                    <div className="col-lg-2 col-md-4 col-sm-6 col-12 mb-4" key={produit.idProduit || produit.id}>
                        
                        <div className="card"  style={{ position: 'relative' }} onClick={() => navigate(`/produits/${produit.idProduit || produit.id}`)}>
                            <div className="card-body">
                                
                                <img src={`http://127.0.0.1:8000/${produit.image}`} alt={produit.nom} />
                                <div className="card-title" >
                                    {produit.nom}
                                </div>
                                <div>
                                    {produit.quantite !== undefined && (
                                        <span style={{
                                            background: '#a259c6',
                                            color: '#fff',
                                            borderRadius: '8px',
                                            padding: '2px 8px',
                                            fontSize: 13,
                                            fontWeight: 600
                                        }}>
                                            {produit.quantite} en stock
                                        </span>
                                    )}
                                    </div>
                                <div className="card-category">
                                    <span className="emoji">🏷️</span> {produit.categorie?.nom || "Sans catégorie"}
                                </div>
                                <div className="card-text">
                                    <span className="emoji">💸</span> {produit.prix} MAD
                                </div>
                                {role === 'admin' && (
                                <div className="d-flex justify-content-center gap-2 mt-2">
                                    <button
                                        className="btn btn-sm btn-warning"
                                        onClick={e => { e.stopPropagation(); navigate(`/produits/edit/${produit.idProduit || produit.id}`); }}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={e => { e.stopPropagation(); handleDelete(produit.idProduit || produit.id); }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>                              
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ScrollToTopButton />
        </div>
    );
};

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) setVisible(true);
            else setVisible(false);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return visible ? (
        <button
            onClick={scrollToTop}
            style={{
                position: 'fixed',
                bottom: '40px',
                right: '40px',
                zIndex: 1000,
                background: 'linear-gradient(90deg, #a259c6 0%, #f7b267 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                fontSize: '2rem',
                boxShadow: '0 2px 16px #a259c6a0',
                cursor: 'pointer',
            }}
            aria-label="Remonter"
        >
            ↑
        </button>
    ) : null;
};
export default Produits;