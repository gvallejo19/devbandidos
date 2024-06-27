// pages/LaboratoryComponent.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LaboratoryComponent = () => {
  const [laboratories, setLaboratories] = useState([]);

  useEffect(() => {
    const fetchLaboratories = async () => {
      const response = await axios.get('/api/laboratories');
      setLaboratories(response.data);
    };

    fetchLaboratories();
  }, []);

  return (
    <div>
      <h2>Laboratories</h2>
      <ul>
        {laboratories.map((lab) => (
          <li key={lab.id}>{lab.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LaboratoryComponent;
