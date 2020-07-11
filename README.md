# whatsApp_Node
 whatsApp Node
 # Librerias Utilizadas 
 https://waguide.pedroslopez.me/
"qrcode-terminal": "^0.12.0",
"whatsapp-web.js": "^1.7.0"

 # Inicio
 nodemon index.js
 desde postman (importar WhatsApp.postman_collection.json )
post  http://localhost:3000/whatsapp/connect
Se obtiene un qr el cual tiene que ser leido como el webwhatsapp
Luego
Client is ready
mensaje de prueba
desde postman post http://localhost:3000/whatsapp/sendmessage
body => raw => jsom
{    "phone" : "549261xxxx@c.us",
    "body" : "hola como estas "
 }
