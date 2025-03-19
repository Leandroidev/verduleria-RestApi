# :tomato: Verduleria RestApi

## [IR AL PROYECTO ONLINE (desplegado en render)](https://brilliant-conkies-4ca1b8.netlify.app)

### Descripción del Proyecto

El frontend de **Verduleria de Lea** es una interfaz interactiva y funcional para la gestión de mercaderia y el control de una verduleria . Está diseñada para proporcionar una experiencia de usuario intuitiva, adaptándose tanto a usuarios finales como a administradores/empleados. Este proyecto utiliza **React.js** junto con **Context API** para una gestión eficiente del estado global y ofrece una interfaz moderna, responsiva y dinámica. Ademas de utilizar **Reducer** para manejar el estado del carrito e implementa **Local Storage** para la persistencia de productos y usuarios, gestiona sus peticiones a la APi
con **Axios**.

---

### Funcionalidades Principales

#### Rutas (las mas relevantes)

- **/Productos**: Lleva a la lista de productos o paneles de administrador si se encuentra logeado
- **/admin/logIn**: a esta ruta se accede manteniendo 3 segundos el click sobre el logo de la navbar y permite autentificar como dueño (**User**:userAdmin, **Password**:userPassword)
- **/logIn**: permite el logeo como administrador (**User**:admin, **Password**:admin) se accede dando 3 clicks consecutivos en el logo de la navbar

#### **1. Gestión de Productos**

- **Visualización de Productos:**
  - Los usuarios pueden navegar y explorar los productos disponibles. Ademas de cargarlos a su carrito para posteriormente enviarlos por WhatsApp
- **CRUD Completo (Productos):**
  - Crear, Editar y Eliminar productos directamente desde la interfaz. Siempre y cuando se tengan privilegios de "dueño" o "administrador"
- **Read Create Delete (administradores):**
  - Lista, crea y borra usuarios, siempre y cuando se tengan privilegios de "dueño"
- **Filtrado Dinámico:**
  - Búsqueda y filtrado de productos según categorías y atributos.

#### **2. Estado del Local (Shop)**

- **Alternar Estado de Apertura/Cierre:**
  - Botón dinámico que permite a los administradores abrir o cerrar el local.
  - Cambios reflejados visualmente y sincronizados con el backend.
- **Pantalla de Local Cerrado:**
  - Si el local está cerrado, los usuarios finales ven un mensaje claro indicando el estado.

#### **3. Roles de Usuarios**

- **Diferenciación de Roles:**
  - El dueño tiene acceso a todas las herramientas.
  - Los administradores tienen acceso a herramientas de gestion de mercaderia y cierre/apertura del local.
  - Los usuarios finales solo ven los productos disponibles y no pueden realizar cambios, solo agregar productos al carrito.

#### **4. Interfaz Amigable**

- **Popups Interactivos:**
  - Modales para la creación y edición de productos con validación de formularios.
- **Indicadores Visuales:**
  - Colores dinámicos en los botones para reflejar el estado actual del local (verde para abierto, rojo para cerrado).
- **Diseño Responsivo:**
  - Adaptado para funcionar en diferentes tamaños de pantalla, desde móviles hasta escritorio.

---

### Tecnologías Utilizadas

- **Librerías y Frameworks:**
  - Axios (para el manejo de peticiones)
  - React.js
  - React Router DOM (para manejo de rutas).
- **Gestión de Estado:**
  - Context API.
- **Estilizado:**
  - CSS Modules y estilos personalizados.

---

### [Conoce la RESTAPI del proyecto](https://github.com/Leandroidev/verduleria-RestApi)

### Pendientes

- **Verificar datos del formulario en CreatePopUp**
- **Conectar con WebSockets para una experiencia en tiempo real**
- **Configurar el envio de mensajeria con los pedidos**
