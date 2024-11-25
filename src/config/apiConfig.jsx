const API_BACKEND = import.meta.env.API_BACKEND;

if (!API_BACKEND) {
  throw new Error("La variable de entorno API_BACKEND no está definida.");
}

export default API_BACKEND;
