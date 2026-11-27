# 🎾 Backend — Catamarca Pádel

Backend de Trabajo Práctico Final — Plataforma web para el ecosistema del pádel en Catamarca.

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

## 🏗️ Arquitectura y Decisiones Técnicas

- **Separación de Responsabilidades:** El código está dividido en carpetas para `models`, `controllers`, `services`, `routes`, `middlewares` y `validations`. Esto facilita el mantenimiento, la escalabilidad y las pruebas.
- **Uso de `.js` en lugar de `.jsx` y Sistema de ES Modules (`"type": "module"`):**
  - **Por qué `.js` y no `.jsx`:** La extensión `.jsx` (*JavaScript XML*) es exclusiva de bibliotecas de interfaz como React que requieren un empaquetador (como Vite) para transpilar etiquetas visuales antes de ejecutarse en el navegador. El Backend en **Node.js** funciona exclusivamente como API RESTful (procesando peticiones HTTP, lógica de negocio y respuestas JSON sin renderizar vistas), por lo que utiliza JavaScript puro (`.js`).
  - **Configuración y ajustes realizados:** Se habilitó `"type": "module"` en `package.json` para utilizar la sintaxis moderna de `import` / `export` en lugar de `require()` (CommonJS). Dado que Node.js en modo ES Modules no resuelve extensiones automáticamente como lo hace Vite en el Frontend, se explicitaron las extensiones `.js` en todas las importaciones locales (ej. `import Club from '../models/Club.js'`), permitiendo además reutilizar los modelos de Mongoose directamente desde los scripts de carga inicial (`seedClubes.js`, `seedTorneos.js`).
- **Seguridad y Prevención de Escalada de Privilegios:** Las contraseñas nunca se guardan en texto plano (se usa `bcryptjs`). Las rutas críticas están protegidas con tokens JWT y validación de roles mediante middlewares, y la capa de servicios (`clubService.js`) filtra campos sensibles como `esSponsor` para que solo un `admin` pueda asignarlos.
- **Validación:** Se implementó `express-validator` para asegurar que los datos entrantes cumplan con las reglas de negocio antes de llegar a la base de datos.
- **Lógica de Roles:** El registro público asigna el rol de `'jugador'` automáticamente. Los roles de `'organizador'`, `'dueño_club'` o `'profesor'` quedan en estado pendiente (`rolAprobado: false`) hasta que un administrador los apruebe desde su panel.
- **Monetización y Destacados:** El modelo `Club` incorpora el atributo `esSponsor` (booleano administrado exclusivamente por `admin`), permitiendo destacar complejos auspiciantes en el ordenamiento de consultas y mostrar insignias oficiales en el Frontend.

---

## 📁 Estructura del Proyecto

```text
padel-catamarca-backend/
├── src/
│   ├── config/          # Conexión a MongoDB y configuración general
│   ├── controllers/     # Lógica de request/response
│   ├── middlewares/     # Auth, roles, manejo de errores
│   ├── models/          # Esquemas de Mongoose (User, Club, Torneo, Profesor...)
│   ├── routes/          # Definición de endpoints
│   ├── services/        # Lógica de negocio (clubService.js, etc.)
│   ├── validations/     # Reglas de express-validator
│   └── seeds/           # Scripts de carga inicial (seedClubes.js, seedTorneos.js)
├── .env.example
├── package.json
└── README.md

 Cómo correr el proyecto localmente
Requisitos previos
Node.js >= 18

pnpm (se puede instalar con npm i -g pnpm o habilitar con corepack enable)

Una cuenta en MongoDB Atlas (o una instancia local de MongoDB)

Pasos
Clonar el repositorio:

bash
git clone https://github.com/<tu-usuario>/padel-catamarca-backend.git
cd padel-catamarca-backend
Instalar las dependencias:

bash
pnpm install
Crear el archivo .env a partir del ejemplo:

bash
cp .env.example .env
Completar las variables de entorno en .env:

env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<dbname>
JWT_SECRET=<una_cadena_larga_y_segura>
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
(Opcional) Cargar datos iniciales de prueba:

bash
pnpm run seed
Levantar el servidor en modo desarrollo:

bash
pnpm dev
La API quedará disponible en http://localhost:3000/api.

Para producción:

bash
pnpm start
🔐 Variables de Entorno
Variable	Descripción	Ejemplo
PORT	Puerto del servidor	3000
MONGO_URI	Cadena de conexión a MongoDB Atlas	mongodb+srv://...
JWT_SECRET	Clave secreta para firmar tokens	cadena larga aleatoria
JWT_EXPIRES_IN	Duración del token	7d
CORS_ORIGIN	Origen permitido del Frontend	http://localhost:5173
⚠️ Nunca subas el archivo .env al repositorio. Solo el .env.example.

 Deploy en Producción
Backend API (Render): https://padel-catamarca-api.onrender.com

Frontend (Netlify): https://catamarcapadel.netlify.app/

ℹ️ El Backend en Render puede tardar ~50 segundos en despertar si estuvo inactivo (plan gratuito).

🔐 Credenciales de Prueba
Email: admin@padel.com

Contraseña: admin123

⚠️ Estas credenciales corresponden únicamente al entorno de demo. En un despliegue real deben cambiarse antes de publicar.

📌 Notas
Todos los endpoints protegidos requieren el header Authorization: Bearer <token>.

La documentación de endpoints se puede probar con Postman/Thunder Client. (Próximamente: colección exportable y/o Swagger).

👤 Autoría
Autor: <SELEMÍN SALIM HÉCTOR>

Materia: Trabajo Práctico Final — <DISEÑO WEB FULL STACK>

Institución: <NODO TECNOLÓGICO>

Año: 2026

📄 Licencia
Este proyecto se distribuye con fines académicos. Consultá con el autor antes de reutilizarlo con fines comerciales.