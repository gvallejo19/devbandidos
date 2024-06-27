// pages/InventoryComponent.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryComponent = () => {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      const response = await axios.get('/api/equipments');
      setEquipments(response.data);
    };

    fetchEquipments();
  }, []);

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {equipments.map((equipment) => (
          <li key={equipment.id}>{equipment.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryComponent;
