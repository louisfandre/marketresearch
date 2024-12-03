import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ show, onClose, errorMessage }) => {
  return (
    <Modal 
      show={show} 
      onHide={onClose} 
      centered 
      className="error-modal animate__animated animate__fadeIn"
    >
      <Modal.Header className="border-0">
        <Modal.Title className="text-danger">
          <i className="fas fa-exclamation-circle me-2"></i>
          Une erreur est survenue
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <div className="error-icon mb-3">
            <i className="fas fa-times-circle text-danger" style={{ fontSize: '48px' }}></i>
          </div>
          <p className="text-muted mb-0">
            {errorMessage || "Nous n'avons pas pu traiter votre demande. Veuillez réessayer plus tard."}
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0 justify-content-center">
        <Button variant="outline-danger" onClick={onClose}>
          Fermer
        </Button>
        <Button variant="flemme" onClick={onClose}>
          Réessayer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;