import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SuccessModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} centered backdrop="static" className="success-modal">
      <Modal.Header>
        <Modal.Title>Demande envoyée avec succès !</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <div className="success-icon mb-4">
            <i className="fas fa-check-circle text-success" style={{ fontSize: '48px' }}></i>
          </div>
          <h4>Votre étude de marché est en cours de création</h4>
          <p className="text-muted">
            Nous avons bien reçu votre demande. Vous recevrez votre étude de marché par email dans les plus brefs délais.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button variant="flemme" onClick={onClose}>
          Retour à l'accueil
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;