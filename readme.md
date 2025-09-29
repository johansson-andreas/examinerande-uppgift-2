## Teoretiska resonemang

**- Motivera ditt val av databas** 
Valde att använda mongoose helt enkelt för att det är det nya i den här kursen. Har använt SQL & prisma tidigare så det här var den större utmaningen

**- Redogör vad de olika teknikerna (ex. verktyg, npm-paket, etc.) gör i applikationen**
    bcrypt: Använder bcrypt för att hasha och salta lösenord
    dotenv: För att spara variabler i en dold .env fil
    express: Används för att skapa en server och hantera routing
    jsonwebtoken: Används för att signera och verifiera förfrågningar
    mongoose: För att kommunicera med databasen
    tsx: För att kunna köra seed scriptet
    zod: Används för att verifiera informationen som kommer in via endpointsen.

**Redogör översiktligt hur applikationen fungerar**
Det finns två modeller, Task och User, med de vanliga CRUD routerna för dem. Det finns även en login route för användare. För alla routes med ett user id i params så ligger det en idCheck middleware. För ett antal endpoints så ligger det en authCheck för att kolla om du begär din egen information, eller om du är en admin. 

Seedscriptet kan köras med 'npm run seed', det skapar 5 användare med 5 tasks var, och en admin användare med inlogget {"email": joel@johansen.bz,"password": "VivaldiIsOverrated"}

Servern körs igång med 'npm run dev'

**Användning av routes**

***Tasks***
POST /api/task - Skapa ny task
{
  "title": "Finish README documentation",
  "description": "Write Postman examples for the Task endpoints",
  "status": "to-do",
  "assignedTo": "66fbf7e2845cfc178dd05f52"
}

GET /api/task/:id - Hämta en specifik task

PATCH /api/task/:id - Uppdatera en specifik task
{
  "status": "done",
  "description": "Added example Postman requests to README"
}

DELETE /api/task/:id - Ta bort en specifik task, kräver antingen admin konto eller att det är din egen task

***Users***
POST /api/user - Skapa en användare

{
  "name": "Alice Example",
  "email": "alice@example.com",
  "password": "SuperSecret123"
}

POST /api/users/login - Logga in användare för att få JWT token
{
  "email": "alice@example.com",
  "password": "SuperSecret123"
}

GET /api/users/:id - Hämta en specifik användare, kräver antingen admin konto eller att det är din egen användare

PATCH /api/users/:id - Uppdatera en användare, kräver antingen admin konto eller att det är din egen användare. Nytt potentiellt lösenord är hashat
{
  "name": "Alice Updated",
  "password": "NewSuperSecret456"
}

DELETE /api/users/:id - Tar bort en användare, kräver antingen admin konto eller att det är din egen användare