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