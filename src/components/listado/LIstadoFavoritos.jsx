import React, { useState, useEffect } from 'react';
import './Listado.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2'
import API_BACKEND from '../../config/apiConfig';

const LIstadoFavoritos = () => {
    const [show, setShow] = useState(false);
    const [todos, setTodos] = useState([]); 

    const url = "https://vigilant-meme-rjgr4q4j57rhxg5r-8085.app.github.dev";

    const fetchApi = async () => {
        try {
            const response = await fetch(`${API_BACKEND}api/favoritos`);
            const data = await response.json();
            console.log('Datos de la API:', data); 
            setTodos(data);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
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
              const response = await fetch(`${API_BACKEND}api/delete/${id}`, {
                method: 'DELETE',
              });
      
              if (response.ok) {
                Swal.fire({
                  title: "Eliminado!",
                  text: "El dato ha sido eliminado.",
                  icon: "success",
                });
      
                fetchApi(); 
              } else {
                throw new Error('Error al eliminar los datos');
              }
            } catch (error) {
              console.error('Error en la eliminación:', error);
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al eliminar los datos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          }
        });
      };
      


      const remover = async (id) => {
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
          text: `¿Deseas eliminar de favitos el dato con id: ${id}?`, 
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminarlo",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await fetch(`${API_BACKEND}api/restaurar/${id}`, {
                method: 'PUT',
              });
      
              if (response.ok) {
                Swal.fire({
                  title: "Removido!",
                  text: "El dato ha sido removido de la lista.",
                  icon: "success",
                });
      
                fetchApi(); 
              } else {
                throw new Error('Error al remover los datos');
              }
            } catch (error) {
              console.error('Error al remover:', error);
              Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al remover el datos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          }
        });
      };
      

    useEffect(() => {
        fetchApi();
    }, []); 
    const toggleSidebar = () => {
        console.log('Cambiando visibilidad del sidebar');
        setShow(prevState => !prevState);
        fetchApi();
    };

    return (
        <div>
            <button className="btnopciones" onClick={toggleSidebar}>
            <i className="bi bi-star-fill"></i>

            </button>

            <div
                className={`offcanvas offcanvas-end ${show ? 'show' : ''}`}
                tabIndex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
                style={{ visibility: show ? 'visible' : 'hidden', opacity: show ? 1 : 0 }}
            >
                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel">FAVORITOS</h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Cerrar"
                        onClick={toggleSidebar}
                    ></button>
                </div>
                {todos.length === 0 ? (
                    <p>Cargando...</p>
                ) : (
                    <div className="offcanvas-body">

                        {todos.map((todo, index) => (
                            <div className='datosHistorial'>

                                <div className="textCotainer" key={index}>

                                    <div>
                                        <p className="tituloTextHistorial">
                                            {todo.input_text}
                                        </p>
                                        <p className="subtituloTextHistorial">
                                            {todo.translated_text}
                                        </p>
                                    </div>
                                    <div className="iconoHistorial">
                                        <button className="btn_Historial_Acciones_favoritos_estrella" onClick={() => remover(todo.id)}>
                                            <i className="bi bi-star-fill"></i>
                                        </button>
                                        <button className="btn_Historial_Acciones" onClick={() => eliminar(todo.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>)}
            </div>
        </div>
    );
};

export default LIstadoFavoritos;
