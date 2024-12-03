import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/layout/Header';
import MarketStudyForm from './components/forms/MarketStudyForm';
import './styles/main.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Container>
        <MarketStudyForm />
      </Container>
    </div>
  );
}

export default App;