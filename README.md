# padel-catamarca-backend-git
Backend de Trabajo Práctico Final — Plataforma web para el ecosistema del pádel en Catamarca.

# 🎾 Backend - Catamarca Pádel

Este es el servidor (API RESTful) para la plataforma de gestión de clubes, torneos de pádel amateur, profesores y agenda de jugadores en toda la provincia de Catamarca.

## 🚀 Tecnologías Utilizadas
- **Node.js & Express:** Entorno de ejecución y framework del servidor (ES Modules).
- **MongoDB Atlas & Mongoose:** Base de datos NoSQL en la nube y modelado de datos.
- **JSON Web Tokens (JWT):** Autenticación y manejo de sesiones.
- **Bcryptjs:** Encriptación (hashing) de contraseñas.
- **Express-Validator:** Validación y sanitización de datos en los endpoints.
- **Dotenv:** Manejo de variables de entorno.
- **CORS:** Configuración de seguridad para conectar con el Frontend.

---

## ⚙️ Cómo correr el proyecto localmente

1. Clonar el repositorio.
2. Instalar las dependencias:
   ```bash
   pnpm install

Crear un archivo .env en la raíz del proyecto basándote en el archivo .env.example. Debe contener:

Fragmento de código
PORT=3000
MONGO_URI=tu_url_de_mongodb_atlas
JWT_SECRET=tu_palabra_secreta
Correr el servidor en modo desarrollo (con nodemon):

Bash
pnpm run dev
(Opcional) Scripts de carga inicial (Seeding):

Crear el usuario Administrador inicial:

Bash
node seedAdmin.js
Poblar la base con 25 clubes reales de Catamarca (Capital, Santa María, Tinogasta, Andalgalá, Belén, La Paz y Paclín):

Bash
node seedClubes.js
Poblar la base con 20 torneos de demostración vinculados automáticamente a sus sedes reales:

Bash
node seedTorneos.js

Endpoints Principales
Autenticación (/api/auth)
POST /register - Registro de usuario (jugador por defecto; organizador o dueño_club quedan pendientes de aprobación).

POST /login - Inicio de sesión (devuelve Token JWT).

Usuarios (/api/users) - Protegidas (Solo Admin)
GET / - Listar todos los usuarios registrados.

PUT /:id/aprobar - Aprueba a un organizador, dueño de club o profesor.

Clubes (/api/clubes)
GET / - Listar todos los clubes (Público). Acepta filtro ?departamento= y ordena priorizando los Clubes Sponsors (esSponsor: true).

GET /:id - Ver detalle de un club (Público: dirección, departamento, servicios, ubicación Maps, redes sociales y estado sponsor).

POST / - Crear un club (Requiere Token de organizador/dueño aprobado — límite de 5 clubes por organizador).

PUT /:id - Editar un club (Requiere Token de dueño o admin; el campo esSponsor solo puede ser modificado por un admin).

DELETE /:id - Borrar un club (Requiere Token de dueño o admin).

Torneos (/api/torneos)
GET / - Listar torneos (Público — acepta filtros por ?categoria=1ra o ?club=ID y popula sus sedes).

GET /:id - Ver detalle de un torneo (incluye sedes vinculadas, fechas, categorías y premios).

POST / - Crear un torneo individual o multisede (Requiere Token de organizador aprobado o admin).

PUT /:id - Editar un torneo (Requiere Token de dueño o admin).

DELETE /:id - Borrar un torneo (Requiere Token de dueño o admin).

Profesores (/api/profesores)
GET / - Listar directorio público de profesores certificados.

POST / - Crear perfil de profesor (Requiere Token aprobado).

PUT /:id - Editar perfil de profesor (Requiere Token).

DELETE /:id - Eliminar perfil de profesor (Requiere Token).

Favoritos (/api/favoritos) - Protegidas
GET / - Ver mi agenda de torneos guardados.

POST /toggle/:torneoId - Agregar o quitar un torneo de la agenda.

Arquitectura y Decisiones Técnicas
Separación de Responsabilidades: El código está dividido en carpetas para models, controllers, services, routes, middlewares y validations. Esto facilita el mantenimiento, la escalabilidad y las pruebas.

Seguridad y Prevención de Escalada de Privilegios: Las contraseñas nunca se guardan en texto plano (se usa bcryptjs). Las rutas críticas están protegidas con tokens JWT y validación de roles mediante middlewares, y la capa de servicios (clubService.js) filtra campos sensibles como esSponsor para que solo un admin pueda asignarlos.

Validación: Se implementó express-validator para asegurar que los datos entrantes cumplan con las reglas de negocio antes de llegar a la base de datos.

Lógica de Roles: El registro público asigna el rol de 'jugador' automáticamente. Los roles de 'organizador', 'dueño_club' o 'profesor' quedan en estado pendiente (rolAprobado: false) hasta que un administrador los apruebe desde su panel.

Monetización y Destacados: El modelo Club incorpora el atributo esSponsor (booleano administrado exclusivamente por admin), permitiendo destacar complejos auspiciantes en el ordenamiento de consultas y mostrar insignias oficiales en el Frontend.