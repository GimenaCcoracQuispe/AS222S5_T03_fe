import React, { useState, useEffect } from 'react';
import './Listado.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2';
import BASE_URL from '../../config/apiConfig';

const Listado = ({ onEdit }) => {
  const [show, setShow] = useState(false);
  const [todos, setTodos] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await fetch(`${BASE_URL}api/active`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const favoritos = async (id) => {
    if (!id) {
      Swal.fire({
        title: 'Error',
        text: 'El id proporcionado no es válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    try {
      await fetch(`${BASE_URL}api/favoritos/${id}`, { method: 'PUT' });
      fetchApi();
    } catch (error) {
      console.error('Error en la actualización de favoritos:', error);
    }
  };

  const eliminar = async (id) => {
    if (!id) {
      Swal.fire({
        title: 'Error',
        text: 'El id proporcionado no es válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    Swal.fire({
      title: "¿Estás seguro de eliminar?",
      text: `¿Deseas eliminar el dato con id: ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${BASE_URL}api/delete/${id}`, { method: 'DELETE' });
          fetchApi();
        } catch (error) {
          console.error('Error al eliminar:', error);
        }
      }
    });
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const toggleSidebar = () => {
    setShow(prevState => !prevState);
    fetchApi();
  };

  const handleEditClick = (id, inputText, translatedText) => {
    onEdit(id, inputText, translatedText);  
  };

  return (
    <div>
      <button className="btnopciones" onClick={toggleSidebar}>
        <i className="bi bi-clock-history"></i>
      </button>

      <div
        className={`offcanvas offcanvas-end ${show ? 'show' : ''}`}
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">Historial</h5>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={toggleSidebar}
          ></button>
        </div>

        {todos.length === 0 ? (
          <p>Cargando...</p>
        ) : (
          <div className="offcanvas-body">
            {todos.map((todo, index) => (
              <div className="datosHistorial" key={index}>
                <div className="textCotainer">
                  <div>
                    <p className="tituloTextHistorial">{todo.input_text}</p>
                    <p className="subtituloTextHistorial">{todo.translated_text}</p>
                  </div>

                  <div className="iconoHistorial">
                    <button
                      className="btn_Historial_Acciones_estrella"
                      onClick={() => favoritos(todo.id)}
                    >
                      <i className="bi bi-star-fill"></i>
                    </button>
                    <button
                      className="btn_Historial_Acciones"
                      onClick={() => eliminar(todo.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <button
                      className="btn_Historial_Acciones"
                      onClick={() => handleEditClick(todo.id, todo.input_text, todo.translated_text)}
                    >
                      <i className="bi bi-pencil"></i> Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listado;
