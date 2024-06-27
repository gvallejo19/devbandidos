import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3307';

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [laboratorioId, setLaboratorioId] = useState('');
  const [editing, setEditing] = useState(false);
  const [currentEquipo, setCurrentEquipo] = useState(null);

  useEffect(() => {
    fetchEquipos();
    fetchLaboratorios();
  }, []);

  const fetchEquipos = async () => {
    try {
      const response = await axios.get(`${API_URL}/equipos`);
      setEquipos(response.data);
    } catch (error) {
      console.error('Error fetching equipos:', error);
    }
  };

  const fetchLaboratorios = async () => {
    try {
      const response = await axios.get(`${API_URL}/laboratorios`);
      setLaboratorios(response.data);
    } catch (error) {
      console.error('Error fetching laboratorios:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API_URL}/equipos/${currentEquipo.id}`, { nombre, tipo, laboratorio_id: laboratorioId });
      } else {
        await axios.post(`${API_URL}/equipos`, { nombre, tipo, laboratorio_id: laboratorioId });
      }
      fetchEquipos();
      setNombre('');
      setTipo('');
      setLaboratorioId('');
      setEditing(false);
      setCurrentEquipo(null);
    } catch (error) {
      console.error('Error saving equipo:', error);
    }
  };

  const handleEdit = (equipo) => {
    setEditing(true);
    setCurrentEquipo(equipo);
    setNombre(equipo.nombre);
    setTipo(equipo.tipo);
    setLaboratorioId(equipo.laboratorio_id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/equipos/${id}`);
      fetchEquipos();
    } catch (error) {
      console.error('Error deleting equipo:', error);
    }
  };

  const getLaboratorioNombre = (id) => {
    const laboratorio = laboratorios.find(lab => lab.id === id);
    return laboratorio ? laboratorio.nombre : 'Desconocido';
  };

  return (
    <div>
      <h1>Administrar Equipos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type='text' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label>Tipo</label>
          <input type='text' value={tipo} onChange={(e) => setTipo(e.target.value)} required />
        </div>
        <div>
          <label>Laboratorio</label>
          <select value={laboratorioId} onChange={(e) => setLaboratorioId(e.target.value)} required>
            <option value=''>Selecciona un laboratorio</option>
            {laboratorios.map((laboratorio) => (
              <option key={laboratorio.id} value={laboratorio.id}>
                {laboratorio.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>{editing ? 'Actualizar' : 'Agregar'} Equipo</button>
      </form>
      <ul>
        {equipos.map((equipo) => (
          <li key={equipo.id}>
            {equipo.nombre} - {equipo.tipo} - Laboratorio: {getLaboratorioNombre(equipo.laboratorio_id)}
            <button onClick={() => handleEdit(equipo)}>Editar</button>
            <button onClick={() => handleDelete(equipo.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Equipos;
