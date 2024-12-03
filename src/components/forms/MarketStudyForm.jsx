import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import LoadingModal from '../modals/LoadingModal';
import SuccessModal from '../modals/SuccessModal';
import ErrorModal from '../modals/ErrorModal';

const WEBHOOK_URL = 'https://hook.eu1.make.com/wkenrlxox99zjabnk2yj3nu0usxmkv14';

function MarketStudyForm() {
  // États
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    websiteUrl: '',
    studyTopic: '',
    geographicArea: '',
    context: '',
    acceptTerms: false
  });

  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  // Fonctions
  const validateUrl = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.companyName.trim()) newErrors.companyName = "Le nom de l'entreprise est requis";
    if (!validateUrl(formData.websiteUrl)) newErrors.websiteUrl = "L'URL n'est pas valide";
    if (!formData.studyTopic.trim()) newErrors.studyTopic = "Le thème de l'étude est requis";
    if (!formData.geographicArea.trim()) newErrors.geographicArea = 'La zone géographique est requise';
    if (!formData.acceptTerms) newErrors.acceptTerms = 'Vous devez accepter les CGU';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      websiteUrl: '',
      studyTopic: '',
      geographicArea: '',
      context: '',
      acceptTerms: false
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const firstError = document.querySelector('.is-invalid');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setShowLoading(true);
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submissionDate: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi des données');
      }

      const result = await response.json();
      console.log('Succès:', result);
      
      setShowLoading(false);
      setShowSuccess(true);
      resetForm();
      
    } catch (error) {
      console.error('Erreur:', error);
      setErrorMessage(error.message || "Une erreur est survenue lors de l'envoi du formulaire");
      setShowLoading(false);
      setShowError(true);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleCloseError = () => {
    setShowError(false);
  };

  // Rendu du composant
  return (
    <div className="form-container">
      <div className="custom-card">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3 mb-md-0">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.firstName}
                  placeholder="Votre prénom"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.lastName}
                  placeholder="Votre nom"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email professionnel</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
              placeholder="votre.email@entreprise.com"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3 mb-md-0">
                <Form.Label>Nom de l'entreprise</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  isInvalid={!!errors.companyName}
                  placeholder="Nom de votre entreprise"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Site web de l'entreprise</Form.Label>
                <Form.Control
                  type="url"
                  name="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  isInvalid={!!errors.websiteUrl}
                  placeholder="https://www.exemple.com"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.websiteUrl}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3 mb-md-0">
                <Form.Label>Thème de l'étude de marché</Form.Label>
                <Form.Control
                  type="text"
                  name="studyTopic"
                  value={formData.studyTopic}
                  onChange={handleInputChange}
                  isInvalid={!!errors.studyTopic}
                  placeholder="Ex: Market fit produit innovant"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.studyTopic}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Zone géographique</Form.Label>
                <Form.Control
                  type="text"
                  name="geographicArea"
                  value={formData.geographicArea}
                  onChange={handleInputChange}
                  isInvalid={!!errors.geographicArea}
                  placeholder="Ex: France, Europe, Monde..."
                />
                <Form.Control.Feedback type="invalid">
                  {errors.geographicArea}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label>Contexte de l'étude</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="context"
              value={formData.context}
              onChange={handleInputChange}
              placeholder="Décrivez le contexte de votre étude et vos besoins spécifiques..."
            />
            <Form.Text className="text-muted">
              Plus vous donnez de détails, plus l'étude sera pertinente.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              name="acceptTerms"
              id="acceptTerms"
              label="J'accepte les conditions générales d'utilisation"
              checked={formData.acceptTerms}
              onChange={handleInputChange}
              isInvalid={!!errors.acceptTerms}
              feedback={errors.acceptTerms}
              feedbackType="invalid"
            />
          </Form.Group>

          <Button 
            variant="flemme" 
            type="submit" 
            className="w-100 py-3"
            disabled={showLoading}
          >
            {showLoading ? 'Envoi en cours...' : 'Lancer l\'étude'}
          </Button>
        </Form>
      </div>

      <LoadingModal show={showLoading} />
      <SuccessModal show={showSuccess} onClose={handleCloseSuccess} />
      <ErrorModal 
        show={showError} 
        onClose={handleCloseError}
        errorMessage={errorMessage}
      />
    </div>
  );
}

export default MarketStudyForm;