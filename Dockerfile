# Usa la versión LTS más reciente de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo package.json y package-lock.json primero
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto usado por Vite (por defecto 5173)
EXPOSE 5173

# Comando para iniciar la app
CMD ["npm", "run", "dev"]
