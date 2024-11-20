import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Listado from './components/listado/Listado';
import './App.css';
import ListadoInactive from './components/listado/ListadoInactive';
import LIstadoFavoritos from './components/listado/LIstadoFavoritos';
import Swal from 'sweetalert2';
import { registerUser } from './components/registrar/registrar'; 
import EditForm from './components/editar/EditarForm';
import BASE_URL from './config/apiConfig';

function App() {
  const [mostrarMensaje] = useState(true);
  const [transcribedText, setTranscribedText] = useState(''); 
  const [translatedText, setTranslatedText] = useState(''); 
  const [editingId, setEditingId] = useState(null); 
  const [fromLanguage, setFromLanguage] = useState('es'); 
  const [toLanguage, setToLanguage] = useState('es');  

  const handleEdit = (id, text, translated) => {
    setEditingId(id);  
    setTranscribedText(text); 
    setTranslatedText(translated); 
  };

  const handleSaveEdit = async () => {
    if (!editingId || !transcribedText) return;  

    try {
      console.log(editingId);
      const response = await fetch(`${BASE_URL}api/editar/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_text: transcribedText,
          from_language: fromLanguage,
          to_language: toLanguage,
        }),
      });

      if (response.ok) {
        setEditingId(null);
        setTranscribedText(''); 
        setTranslatedText('');  
        Swal.fire({
          title: "Exito!",
          text: "Cambios realizados correctamente!",
          icon: "success"
        });
      } else {
        console.error('Error al guardar los cambios');
      }
    } catch (error) {
      console.error('Error al actualizar el dato:', error);
    }
  };

  const handleTranslate = (e) => {
    e.preventDefault(); 

    registerUser(e, transcribedText, setTranslatedText);
  };

  return (
    <>
      <div className="circulo1"></div>

      {editingId ? (
        <EditForm
          editingId={editingId}
          transcribedText={transcribedText}
          translatedText={translatedText}
          fromLanguage={fromLanguage}
          toLanguage={toLanguage}
          setTranscribedText={setTranscribedText}
          setTranslatedText={setTranslatedText}
          setFromLanguage={setFromLanguage} 
          setToLanguage={setToLanguage}     
          handleSaveEdit={handleSaveEdit}
        />
      ) : (
        <div className="cardTraductor">
          <h5 className="tituloCardForm">TRADUCTOR</h5>
          <form onSubmit={handleTranslate}>
            <div className="containerFormTraducir">
              <div>
                <select 
                  className="form-select" 
                  name="textoIdiomaEntrada" 
                  aria-label="Idioma de origen"
                  onChange={(e) => setFromLanguage(e.target.value)} 
                  value={fromLanguage}
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                  <option value="fr">Francés</option>
                  <option value="de">Alemán</option>
                  <option value="it">Italiano</option>
                  <option value="pt">Portugués</option>
                  <option value="ru">Ruso</option>
                  <option value="ja">Japonés</option>
                  <option value="zh">Chino</option>
                  <option value="ar">Árabe</option>
                </select>

                <textarea
                  name="textoTraducir"
                  className="textTareaInput"
                  placeholder="Escribe aquí el texto"
                  value={transcribedText}
                  onChange={(e) => setTranscribedText(e.target.value)} 
                />
              </div>

              <div>
                <select 
                  className="form-select" 
                  aria-label="Idioma de destino" 
                  name="textoATraducir"
                  onChange={(e) => setToLanguage(e.target.value)} 
                  value={toLanguage}
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                  <option value="fr">Francés</option>
                  <option value="de">Alemán</option>
                  <option value="it">Italiano</option>
                  <option value="pt">Portugués</option>
                  <option value="ru">Ruso</option>
                  <option value="ja">Japonés</option>
                  <option value="zh">Chino</option>
                  <option value="ar">Árabe</option>
                </select>

                <textarea
                  className="textTareaInput"
                  value={translatedText} 
                  readOnly 
                />
              </div>
            </div>

            <button type="submit" className="btn_traducir">
              Traducir
            </button>
          </form>
        </div>
      )}

      <div className="opcionesTraductor">
        <div className="listaOpcionesDentro">
          {mostrarMensaje && <Listado onEdit={handleEdit} />}
          {mostrarMensaje && <LIstadoFavoritos />}
          {mostrarMensaje && <ListadoInactive />}
        </div>
      </div>

      <div className="circulo2"></div>
    </>
  );
}

export default App;
