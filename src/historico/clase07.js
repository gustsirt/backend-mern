const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let frase = "frase inicial"


app.get('/api/frase', (req, res) => {
  res.json({frase});
});

app.get('/api/palabras/:pos', (req, res) => {
  const pos = req.params.pos
  
  const palabras = frase.split(" ")

  if (pos >0 && pos <= palabras.length) {
    return res.status(200).json({ status: "ok", data: palabras[pos-1] })
  } else {
    return res.status(404)
  }
});

app.post('/api/palabras', (req, res) => {
  const palabra = req.body;
  
  res.json({frase});
});


app.listen(PORT, () => console.log(`Escuchando puerto ${PORT}`));
