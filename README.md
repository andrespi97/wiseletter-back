```bash
npm init -y
npm i -D typescript tsx @types/node
npx tsc --init

npm i express
npm i -D @types/express

npm i -D @swc/core @swc/cli 

npm i prisma @prisma/client 
# Recomendable instalar la extensión prisma de vscode

npm i bcrypt
npm i -D @types/bcrypt

npm i jsonwebtoken
npm i -D @types/jsonwebtoken


npm i express-rate-limit
npm i helmet

npm i compression
npm i --save-dev @types/compression

npm i cookie-parser
npm i --save-dev @types/cookie-parser

npm i cors
npm i --save-dev @types/cors

npm i express-validator


npm install -g npm-check-updates
npx npm-check-updates           // comprobar
npx npm-check-updates -u        // actualiza

npm i morgan
npm i --save-dev @types/morgan

actualizar turso turso db shell newslettersdb < ./prisma/migrations/20250307121619_con_newsletters/migration.sql

```





Ejercicio 1:
Crea el endpoint que liste todos los usuarios de la web
A este endpoint solo puede acceder el usuario role=admin
Crea routas, servicios, controllers, middleware


Ejercicio 2:
Valida mediante un middleware
El formulario de registro
- Comprueba que el email sea válido
- Comprueba que el password se de minimo 4 letras


Ejercicio 3:
Crea un fronted con Vite + tailwind 4.0 + react



- [] refresh token