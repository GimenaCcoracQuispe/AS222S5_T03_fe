import React, { useEffect } from 'react';

const EditForm = ({ 
  editingId, 
  transcribedText, 
  translatedText, 
  fromLanguage, 
  toLanguage, 
  setTranscribedText, 
  setTranslatedText, 
  setFromLanguage, 
  setToLanguage, 
  handleSaveEdit 
}) => {
  
  useEffect(() => {
    if (editingId) {
      console.log("Cargando texto de la API para editar...", editingId);
    }
  }, [editingId]);

  return (
    <div className="cardTraductor">
      <h5 className="tituloCardForm">EDITAR TEXTO</h5>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="containerFormTraducir">
          <div>
            <select
              className="form-select"
              name="textoIdiomaEntrada"
              aria-label="Idioma de origen"
              value={fromLanguage}
              onChange={(e) => setFromLanguage(e.target.value)} 
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
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
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

        <button type="button" className="btn_traducir" onClick={handleSaveEdit}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditForm;
