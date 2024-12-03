import React from 'react';
import { Modal } from 'react-bootstrap';

const LoadingModal = ({ show }) => {
  return (
    <div className={`success-modal ${show ? 'd-flex' : 'd-none'}`}>
      <div className="success-content">
        <h2>Création de votre étude en cours</h2>
        <div className="loading-animation">
          {/* Animation de chargement */}
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <p className="success-message">
          Nous préparons votre étude de marché personnalisée.<br />
          Merci de patienter quelques instants...
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;