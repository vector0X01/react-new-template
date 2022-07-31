import React from 'react';
import Particles from 'react-tsparticles';
import ParticleConfig from './particles.json';

const ParticleBackground = () => {
  return (
    <div style={{ position: 'absolute' }}>
      <Particles style={{ width: '50vw' }} params={ParticleConfig}></Particles>
    </div>
  );
};

export default ParticleBackground;
