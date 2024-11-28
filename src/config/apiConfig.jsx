const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("La variable de entorno VITE_API_BACKEND no está definida.");
}
console.log("LA URL ES: ",BASE_URL)
export default BASE_URL;
