/*var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});*/

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware para poder leer JSON en requests
app.use(express.json());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Conectado a MongoDB 🎉"))
.catch(err => console.error("Error de conexión:", err));

// Definir esquema de conciertos (events)
const eventSchema = new mongoose.Schema({
  name: String,
  artist: String,
  date: String,
  location: String
});

// Modelo basado en el esquema
const Event = mongoose.model('Event', eventSchema);

// Rutas CRUD

// ➡️ GET: listar todos los eventos
app.get('/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// ➡️ POST: añadir un evento nuevo
app.post('/events', async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.send("🎶 Evento añadido con éxito!");
});

// ➡️ DELETE: borrar un evento por ID
app.delete('/events/:id', async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.send("🗑️ Evento eliminado!");
});

// Servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

