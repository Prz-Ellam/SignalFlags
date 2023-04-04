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
Un Usuario crea Muchos Grupos
Muchos Usuarios tienen Muchas Tareas
Un Usuario tiene Muchas Publicaciones
Un Usuario tiene Muchas Participaciones (Participantes)
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
- Foto de perfil
- Grupos: []



