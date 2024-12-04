const path = require('path');
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

// Configuración de la base de datos
const config = {
  user: 'agricompra', // tu usuario
  password: 'axo2024.', // tu contraseña
  server: 'agricompra.database.windows.net', // nombre del servidor
  database: 'Productos', // nombre de la base de datos
  options: {
    encrypt: true, // para conexiones seguras
    trustServerCertificate: false, // importante para la seguridad, generalmente "false" si el servidor tiene un certificado oficial
    connectionTimeout: 30000, // tiempo de espera en milisegundos
    requestTimeout: 30000, // tiempo de espera de la solicitud
    port: 1433, // el puerto por defecto para SQL Server
    driver: 'ODBC Driver 18 for SQL Server', // especificamos el driver ODBC adecuado
  }
};

// Conexión a la base de datos
sql.connect(config).then(pool => {
  console.log('Connected to Azure SQL Database');

  // Ruta para obtener los productos desde la base de datos
  app.get('/api/productos', async (req, res) => {
    try {
      const result = await pool.request().query('SELECT * FROM Productos');
      res.json(result.recordset); // Devuelve los productos en formato JSON
    } catch (err) {
      res.status(500).send('Error en la consulta: ' + err.message);
    }
  });

  // Ruta para verificar la conexión a la base de datos
  app.get('/api/check-connection', async (req, res) => {
    try {
      await pool.request().query('SELECT 1');
      res.send('Database connection is successful');
    } catch (err) {
      res.status(500).send('Database connection failed: ' + err.message);
    }
  });

}).catch(err => {
  console.error('Database connection failed:', err);
});

// Servir archivos estáticos de React desde la carpeta build (solo en producción)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));

  // Enviar el archivo index.html para todas las rutas no reconocidas (para el enrutamiento en React)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Puerto del servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
