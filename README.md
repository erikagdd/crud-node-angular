Aquest projecte forma part de la pràctica del mòdul Servidor i consisteix en el desenvolupament d’un CRUD complet utilitzant Node.js, Express i MongoDB com a base de dades.

Les principals tecnologies utilitzades han sigut Node.js, Express, MongoDB, Mongoose i Postman per a provar les rutes de l’API.

Per executar-lo, cal instal·lar les dependències amb npm install i comprovar que el servei MongoDB està actiu amb net start MongoDB.
Després s’inicia el servidor amb node index.js, que s’executa al port 8080.

Una de les principals dificultats trobades va ser que el servidor no responia al port 8080. Després de revisar el codi, es va descobrir que el problema era que la base de dades MongoDB no estava en execució. Un cop iniciat el servei, la connexió es va establir correctament i les peticions es van poder provar sense problemes des de Postman.

El CRUD queda completament funcional i connectat amb MongoDB, amb les operacions de creació, lectura, actualització i eliminació comprovades correctament.
