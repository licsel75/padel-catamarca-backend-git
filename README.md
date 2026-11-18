# padel-catamarca-backend-git
backend de trabajo practico final 
# Backend - Catamarca Pádel

Este es el servidor (API RESTful) para la plataforma de gestión de torneos de pádel amateur. 

## 🚀 Tecnologías Utilizadas
*   **Node.js & Express:** Entorno de ejecución y framework del servidor.
*   **MongoDB Atlas & Mongoose:** Base de datos NoSQL en la nube y modelado de datos.
*   **JSON Web Tokens (JWT):** Autenticación y manejo de sesiones.
*   **Bcryptjs:** Encriptación (hashing) de contraseñas.
*   **Express-Validator:** Validación de datos en los endpoints.
*   **Dotenv:** Manejo de variables de entorno.
*   **CORS:** Configuración de seguridad para conectar con el Frontend.

## ⚙️ Cómo correr el proyecto localmente

1. Clonar el repositorio.
2. Instalar las dependencias:
   ```bash
   pnpm install
3. Crear un archivo .env en la raíz del proyecto basándote en el archivo .env.example. Debe         contener:   

PORT=3000
MONGO_URI=tu_url_de_mongodb_atlas
JWT_SECRET=tu_palabra_secreta

4. Correr el servidor en modo desarrollo (con nodemon):
pnpm run dev

5. (Opcional) Si necesitas crear un usuario Administrador inicial, ejecutá el script:
node seedAdmin.js

🗺️ Endpoints Principales
Autenticación (/api/auth)
POST /register - Registro de usuario (rol por defecto: jugador).

POST /login - Inicio de sesión (devuelve Token JWT).

Usuarios (/api/users) - Protegidas (Solo Admin)
PUT /:id/aprobar - Aprueba a un organizador o dueño de club.

Clubes (/api/clubes)
GET / - Listar todos los clubes (Público).

GET /:id - Ver detalle de un club (Público).

POST / - Crear un club (Requiere Token de organizador/dueño aprobado).

PUT /:id - Editar un club (Requiere Token).

DELETE /:id - Borrar un club (Requiere Token).

Torneos (/api/torneos)
GET / - Listar torneos (Acepta filtros por ?categoria=1ra o ?club=ID).

GET /:id - Ver detalle de un torneo.

POST / - Crear un torneo (Requiere Token).

PUT /:id - Editar un torneo (Requiere Token).

DELETE /:id - Borrar un torneo (Requiere Token).

Favoritos (/api/favoritos) - Protegidas
GET / - Ver mi agenda de torneos guardados.

POST /toggle/:torneoId - Agregar o quitar un torneo de la agenda.

🏗️ Arquitectura y Decisiones Técnicas
Separación de Responsabilidades: El código está dividido en carpetas para models, controllers, services, routes, middlewares y validations. Esto facilita el mantenimiento y las pruebas.

Seguridad: Las contraseñas nunca se guardan en texto plano (se usa bcrypt). Las rutas críticas están protegidas con tokens JWT y validación de roles mediante middlewares.

Validación: Se implementó express-validator para asegurar que los datos entrantes cumplan con las reglas de negocio antes de llegar a la base de datos.

Lógica de Roles: El registro público asigna el rol de 'jugador' automáticamente. Los roles de 'organizador' o 'dueño_club' quedan en estado pendiente (rolAprobado: false) hasta que un administrador los apruebe.