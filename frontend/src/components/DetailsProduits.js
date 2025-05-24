import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduittById } from '../services/api';

const ProduitDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [produit, setProduit] = useState(null);

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const response = await getProduittById(id);
                setProduit(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération du produit :', error);
            }
        };

        fetchProduit();
    }, [id]);

    if (!produit) {
        return <div className="text-center mt-5">Chargement...</div>;
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <div className="text-center">
                    <img
                        src={`http://127.0.0.1:8000/${produit.image}`}
                        alt={produit.nom}
                        style={{
                            width: 140,
                            height: 140,
                            objectFit: 'cover',
                            borderRadius: '50%',
                            border: '5px solid #fff',
                            boxShadow: '0 4px 24px #a259c644',
                            background: '#fff0f7',
                            marginTop: 0,
                            marginBottom: 20
                        }}
                    />
                <h2 className="text-center" style={{ color: '#a259c6', fontFamily: 'Pacifico, cursive', marginBottom: 10 }}>
                    {produit.nom}
                </h2>
                <div className="mb-2 text-center" style={{ color: '#5bc0be', fontWeight: 600 }}>
                    <span role="img" aria-label="catégorie">🏷️</span> {produit.categorie?.nom || "Sans catégorie"}
                </div>
                <div className="mb-3 text-center" style={{ color: '#6c757d', fontStyle: 'italic' }}>
                    {produit.description}
                </div>
                <div className="mb-4 text-center" style={{ color: '#f7b267', fontWeight: 'bold', fontSize: '1.3rem' }}>
                    <span role="img" aria-label="prix">💸</span> {produit.prix} MAD
                </div>
               <div className="d-flex justify-content-center">
                <span
                    className="btn"
                    style={{
                        background: 'none',
                        border: 'none',
                        boxShadow: 'none',
                        color: '#a259c6',
                        fontSize: '2rem',
                        cursor: 'pointer'
                    }}
                    onClick={() => navigate('/')}
                    title="Retour à la liste"
                >
                    <i className="fas fa-arrow-left"></i>
                </span>
            </div>
            </div>
        </div>
    );
};

export default ProduitDetails;