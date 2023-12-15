El proyecto se basa en el concepto de poder compartir e intercambiar vivencias que una persona experimenta mientras viaja a 
distintos lugares y hace exploración de los mismos. A través de la aplicacion web, los usuarios pueden realizar posteos de sus viajes
o exponer sus expriencias e ideas para que otros viajeros puedan conocer y compartir esas mismas experiencias. La interacción se
complementa con comentarios de usuarios a otros usuarios en sus posteos.

Para inicializar la aplicacion hay que ejecutar en la terminal:
- npm i (para instalar todos los paquetes necesarios para la ejecucion de la aplicacion).
Luego:
- npm run dev (tanto en el backend como en el frontend), es decir, tienen que estar los dos funcionando al mismo tiempo.
Aclaracion: hay que tener instalado MongoDB.

Detalles:
- Cualquier persona puede acceder a ver (contenido de lectura) sin necesidad de estar registrado.
- Solo las personas registradas pueden acceder a los componentes de editar y eliminar.
- Solo el creador del comentario puede acceder a los botones para editar o eliminar su propio comentario (a traves de renderizado condicional) 
