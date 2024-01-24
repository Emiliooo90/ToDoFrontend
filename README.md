# ToDoFrontend

Esta es una aplicación To Do creada con React.js que consume la API del repositorio ToDoBackend https://github.com/Emiliooo90/ToDoBackend.git para gestionar tareas.

## Instalación

Sigue estos pasos para configurar y ejecutar el proyecto ToDoFrontend en tu entorno local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Emiliooo90/ToDoFrontend.git
   cd ToDoFrontend

2. **Instalar las dependencias**
   ```bash
   npm install
   
3. **Configurar la URL de la API**
   En el archivo api.js que se encuentra en la carpeta services debes cambiar la URL del entorno local de la API para que funcione correctamente.
   ```bash
   const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 1000,
   });
   
4. **Iniciar la aplicación**
   ```bash
   npm run start

Una vez que la aplicación esté en funcionamiento, podrás utilizarla para gestionar tus tareas a través de la API de ToDoBackend.

## Uso
Una vez que la aplicación esté en funcionamiento, podrás utilizarla para gestionar tus tareas. La aplicación se conecta a la API de ToDoBackend para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las tareas.

## Contribuir
Si deseas contribuir a este proyecto, ¡te damos la bienvenida! Puedes hacerlo abriendo un PR (Pull Request) con tus cambios propuestos.

## Licencia
Este proyecto esta bajo la licencia de Emilio Romero.
