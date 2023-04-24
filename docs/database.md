User
- username
- email
- password
- photo

Group
- Name
- Description
- Admins
- Members

Subgroup
- Name
- Description
- Admins
- Members

Post
- Message
- Creator
- Files

Message
- Content
- Date

Homework
- Title
- Instructions

/* Pues los mensajes nunca se van a mezclar entre chats, aquí no hay
necesidad de andar armando queries entre varios chats para obtener mensajes, solo buscarias los mensajes de un chat especifico */
Chat
- Members
- Time
- Messages: {
    Sender
    Receiver
    Content
    Timestamp
}



Muchos Usuarios tienen Muchos Grupos
Muchos Usuarios administran Muchos Grupos

Muchos Usuarios tienen Muchas Tareas
Un Usuario tiene Muchas Publicaciones
Un Usuario tiene Muchos Mensajes
Un Usuario tiene Muchos Vistos

Un Grupo tiene Muchos Subgrupos
Un Grupo tiene Muchas Tareas
Un Grupo tiene Muchas Publicaciones

Un Chat tiene Muchos Participantes
Un Chat tiene Muchos Mensajes
Un Mensaje tiene Muchos Vistos





Usuario
- Nombre
- Email
- Contraseña
- Avatar




Crear un chat
Añadir a alguien al chat

Añadir contacto al chat



- Auth
POST    /api/v1/auth
DELETE  /api/v1/auth


- Users
POST    /api/v1/users
POST    /api/v1/users/:id/avatar
PUT     /api/v1/users/:id/avatar
PUT     /api/v1/users/:id/password
GET     /api/v1/users/:id
GET     /api/v1/users
GET     /api/v1/users/:id/chats
GET     /api/v1/users/:id/groups
GET     /api/v1/users/:id/homeworks


- Chats
POST    /api/v1/chats/individual/:id
POST    /api/v1/chats
POST    /api/v1/chats/:id/avatar
POST    /api/v1/chats/:id/messages
PUT     /api/v1/chats/:id
PUT     /api/v1/chats/:id/avatar
DELETE  /api/v1/chats/:id
GET     /api/v1/chats/:id/members
GET     /api/v1/chats/:id/messages
POST    /api/v1/chats/:id/messages


- Groups

Crea un grupo
POST    /api/v1/groups

Agrega una imagen a un grupo
POST    /api/v1/groups/:id/avatar

Actualiza la informacion de un grupo
PUT     /api/v1/groups/:id

Actualiza la imagen de un grupo
PUT     /api/v1/groups/:id/avatar

Elimina un grupo
DELETE  /api/v1/groups/:id

#POST    /api/v1/groups/:groupId/members/:userId
#DELETE  /api/v1/groups/:groupId/members/:userId

Obtiene un grupo
GET     /api/v1/groups/:id

Obtiene todos los grupos [No aparenta ser necesario]
GET     /api/v1/groups

Obtiene todos los miembros de un grupo
GET     /api/v1/groups/:id/members

Obtiene todos los subgrupos de un grupo
GET     /api/v1/groups/:id/subgroups

Obtiene todas las tareas de un grupo
GET     /api/v1/groups/:id/homeworks

Obtiene todas las publicaciones de un grupo
GET     /api/v1/groups/:id/posts

Crea una publicacion
POST    /api/v1/groups/:id/posts

Crea una publicacion con archivos
POST    /api/v1/groups/:id/posts/uploads

Crea una tarea
POST    /api/v1/groups/:id/assignments




- Assignments
GET     /api/v1/assignments/:id
POST    /api/v1/assignments/:id/finish
DELETE  /api/v1/assignments/:id/finish


- Posts
PUT     /api/v1/posts/:id
DELETE  /api/v1/posts/:id

POST    /api/v1/posts/:id/reply
DELETE  /api/v1/posts/:id/reply




Usuario tiene multimedia (1 avatar)
Grupo tiene multimedia (1 avatar)
Chat tiene multimedia (1 avatar)

Mensaje tiene multimedia (Muchos archivos)
Publicacion tiene multimedia (Muchos archivos)
Tarea tiene multimedia (Muchos archivos)