import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LaboratoriesComponent = () => {
  const [laboratories, setLaboratories] = useState([]);

  useEffect(() => {
    const fetchLaboratories = async () => {
      const response = await axios.get('/api/laboratorios');
      setLaboratories(response.data);
    };

    fetchLaboratories();
  }, []);

  return (
    <div>
      <h1>Laboratories</h1>
      <ul>
        {laboratories.map((lab) => (
          <li key={lab.id}>{lab.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default LaboratoriesComponent;
