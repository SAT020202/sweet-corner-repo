import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getProduits, getUnitesByProduit, addUnite, deleteUnite, getAllUnites } from '../services/api';

const UnitesProduit = () => {
    const [produits, setProduits] = useState([]);
    const [selectedProduit, setSelectedProduit] = useState(null);
    const [datePeremption, setDatePeremption] = useState('');
    const [unites, setUnites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allUnites, setAllUnites] = useState([]);

    useEffect(() => {
        getAllUnites().then(res => setAllUnites(res.data));
    }, []);

    useEffect(() => {
        getProduits().then(res => setProduits(res.data));
    }, []);

    useEffect(() => {
        if (selectedProduit) {
            setLoading(true);
            getUnitesByProduit(selectedProduit.value).then(res => {
                setUnites(res.data);
                setLoading(false);
            });
        } else {
            setUnites([]);
        }
    }, [selectedProduit]);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!selectedProduit || !datePeremption) return;
        await addUnite({
            idProduit: selectedProduit.value,
            datePeremption,
            idAdmin: localStorage.getItem('idAdmin')
        });
        setDatePeremption('');
        // Refresh both lists
        const res = await getUnitesByProduit(selectedProduit.value);
        setUnites(res.data);
        const allRes = await getAllUnites();
        setAllUnites(allRes.data);
    };

    const handleDelete = async (idUnite) => {
        await deleteUnite(idUnite);
        // Refresh both lists
        if (selectedProduit) {
            const res = await getUnitesByProduit(selectedProduit.value);
            setUnites(res.data);
        }
        const allRes = await getAllUnites();
        setAllUnites(allRes.data);
    };

    // Options pour react-select
    const options = produits.map(prod => ({
        value: prod.idProduit,
        label: prod.nom
    }));

    // Tableau d'affichage (utilisé pour allUnites ou unites)
    const renderTable = (data) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12, background: '#fff', borderRadius: 8, overflow: 'hidden', textAlign: 'center' }}>
            <thead>
                <tr style={{ background: '#e6d2fa' }}>
                    <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>ID Unité</th>
                    <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>Produit</th>
                    <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>Catégorie</th>
                    <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>Date de péremption</th>
                    <th style={{ padding: 12, border: '1px solid #eee', fontSize: 16 }}>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map(unite => (
                    <tr key={unite.idUnite}>
                        <td style={{ padding: 12, border: '1px solid #eee', fontSize: 15 }}>{unite.idUnite}</td>
                        <td style={{ padding: 12, border: '1px solid #eee', fontSize: 15 }}>{unite.nomProduit}</td>
                        <td style={{ padding: 12, border: '1px solid #eee', fontSize: 15 }}>{unite.nomCategorie}</td>
                        <td style={{ padding: 12, border: '1px solid #eee', fontSize: 15 }}>{unite.datePeremption}</td>
                        <td style={{ padding: 12, border: '1px solid #eee' }}>
                            <button onClick={() => handleDelete(unite.idUnite)}
                                style={{
                                    background: 'grey',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 6,
                                    padding: '6px 18px',
                                    cursor: 'pointer',
                                    fontSize: 15
                                }}>
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    // Affichage principal
    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            padding: 32,
            background: '#faf8ff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h2 style={{ marginBottom: 32, fontSize: 32, textAlign: 'center' }}>Gestion des unités de produit</h2>
            <form
                onSubmit={handleAdd}
                style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-end',
                    marginBottom: 24,
                    justifyContent: 'center'
                }}
            >
                <div style={{ minWidth: 250 }}>
                    <Select
                        options={options}
                        value={selectedProduit}
                        onChange={setSelectedProduit}
                        placeholder="Sélectionner ou rechercher un produit..."
                        isClearable
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    
                    <input
                        id="datePeremption"
                        type="date"
                        value={datePeremption}
                        onChange={e => setDatePeremption(e.target.value)}
                        required
                        title="Date de péremption"
                        style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, textAlign: 'center' }}
                    />
                </div>
                <button
                    type="submit"
                    disabled={!selectedProduit || !datePeremption}
                    style={{
                        background: '#a259c6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '8px 24px',
                        fontWeight: 500,
                        fontSize: 16,
                        cursor: (!selectedProduit || !datePeremption) ? 'not-allowed' : 'pointer'
                    }}
                >
                    Ajouter une unité
                </button>
            </form>

            <div style={{
                maxWidth: 1100,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 auto'
            }}>
                <h4 style={{ marginTop: 24, fontSize: 20, textAlign: 'center' }}>
                    {selectedProduit ? 'Unités de ce produit' : 'Toutes les unités'}
                </h4>
                {loading ? (
                    <p>Chargement...</p>
                ) : (selectedProduit ? unites : allUnites).length === 0 ? (
                    <p style={{ color: '#888', textAlign: 'center' }}>Chargement...</p>
                ) : (
                    renderTable(selectedProduit ? unites : allUnites)
                )}
            </div>
        </div>
    );
};

export default UnitesProduit;