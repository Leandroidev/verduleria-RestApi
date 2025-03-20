# :tomato: Verduleria BackEnd

---

## [IR AL PROYECTO ONLINE (desplegado en Render)](https://verduleria-restapi.onrender.com/products)

---

## [Conoce el FrontEnd del proyecto](https://github.com/Leandroidev/verduleria)

---

## Descripción del Proyecto

El back-end de **Verdulería de lea** fue planteado como una **Rest API** y se implementó el **modelo MVC** para patrón de diseño. Conecta al back y al front a través de peticiones http. Se utilizó **Express** para el manejo de las solicitudes HTTP, **Zod** para validaciones y **JWT** para las autenticaciones y autorizaciones de administradores/dueño, además de **hashear** información relevante con **Bcrypt**. Se creó una factoría para crear el set de errores personalizados y asi tener mejor control sobre los mismos.

---

## Variables de entorno

```javascript
JWT_SECRET = claveSuperSecreta;
ADMIN_USER = usuarioDelAdministrador;
ADMIN_PASSWORD = passwordDelAdministrador;
```

## Funcionalidades Principales

### Rutas

| RUTA                 | VERBO  | DESCRIPCIÓN                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /products            | GET    | Obtiene los productos y el estado de la tienda. Si la tienda está cerrada y el token no es de administrador, devuelve un array vacío de productos. Si el token es válido, devuelve todos los productos existentes:`{ "isOpen": false, "products": [] }`                                                                                                                                                                                                          |
| /products            | CREATE | Crea un recurso `product` con los valores enviados en el body, verificando sesión y validando los datos. Devuelve el recurso creado. Calcula automáticamente `promoPrice` o `discountPercentage` si alguno es 0. Ejemplo:<br>`{ "id": 37, "name": "Limón", "price": 1500, "promoPrice": 0, "discountPercentage": 0, "weight": 3000, "category": "frutas", "available": true, "img": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Lemons_and_lime.jpg" }` |
| /products/:id        | DELETE | Borra el recurso `product` correspondiente al id proporcionado en params. Devuelve el recurso eliminado:<br>`{ "id": 37, "name": "Limón", "price": 1500, "promoPrice": 0, "discountPercentage": 0, "weight": 3000, "category": "frutas", "available": true, "img": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Lemons_and_lime.jpg" }`                                                                                                                  |
| /products/:id        | PATCH  | Modifica el recurso `product` correspondiente al id proporcionado en params. Mantiene inmutados los campos no modificados y devuelve el recurso actualizado:<br>`{ "id": 37, "name": "Limón", "price": 1500, "promoPrice": 0, "discountPercentage": 0, "weight": 3000, "category": "frutas", "available": true, "img": "https://upload.wikimedia.org/wikipedia/commons/0/0c/Lemons_and_lime.jpg" }`                                                              |
| /user                | GET    | Obtiene un array del recurso `user`. Solo tiene autorización el administrador. Ejemplo de respuesta:<br>`[ { "id": "aad74ca8-1d4b-47eb-8d70-ee61efd8bd1c", "userName": "admin" }, { "id": "c3f805e6-3be3-411d-b160-30496db34fa9", "userName": "admin1" } ]`                                                                                                                                                                                                      |
| /user                | CREATE | Crea un recurso `user` con los valores enviados en el body. Solo tiene autorización el administrador. Devuelve el id del usuario creado:<br>`"98a0f243-6e21-4934-a39e-f3ef6316f34d"`                                                                                                                                                                                                                                                                             |
| /user/:id            | DELETE | Borra el recurso `user` correspondiente al id proporcionado en params. Solo tiene autorización el administrador. Devuelve el usuario eliminado:<br>`{ "id": "98a0f243-6e21-4934-a39e-f3ef6316f34d", "userName": "admin11" }`                                                                                                                                                                                                                                     |
| /user/logIn          | POST   | Logea un usuario verificando los campos enviados en el body. Si es exitoso, devuelve un objeto con algunos datos del usuario:<br>`{ "token": "un token de JWT", "userName": "owner", "role": "owner" }`                                                                                                                                                                                                                                                          |
| /user/sessionActive  | POST   | Verifica el token enviado por Bearer Token. Si es válido, devuelve el rol del usuario y su estado de sesión:<br>`{ "isLogged": true, "role": "user" }`                                                                                                                                                                                                                                                                                                           |
| /shop                | POST   | Alterna el estado `isOpen` de la tienda al recibir un token válido. Devuelve lo mismo que `GET /products` con un token válido.                                                                                                                                                                                                                                                                                                                                   |
| /admin/logIn         | POST   | Endpoint para inicio de sesión del administrador (detalles no proporcionados).                                                                                                                                                                                                                                                                                                                                                                                   |
| /admin/sessionActive | POST   | Similar a `/user/sessionActive`, pero verifica que el token sea válido como administrador y devuelve el rol `"owner"`.                                                                                                                                                                                                                                                                                                                                           |

### Posibles Errores

- **ConnectionError = Error en la conexion a la base de datos**
- **ValidationError = Error de validacion en campos**
- **NotFoundError = Error para recurso no encontrado**
- **UnauthorizedError = Error para usuario no autorizado**
- **TokenExpiredError = Error para token expirado**

### Tecnologías Utilizadas

- **Librerías y Frameworks:**
  - Axios (para el manejo de peticiones)
  - React.js
  - React Router DOM (para manejo de rutas).
- **Gestión de Estado:**
  - Context API.
- **Estilizado:**
  - CSS Modules y estilos personalizados.
