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

## ⚙️ Cómo correr el proyecto localmente

1. Clonar el repositorio.
2. Instalar las dependencias:
   ```bash
   pnpm install