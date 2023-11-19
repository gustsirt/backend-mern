const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

let frase = "frase inicial"


app.get('/api/frase', (req, res) => {
  return res.status(200).json({ status: "ok", dat: frase});
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

app.put('/api/palabras/:pos', (req, res) => {
  const pos = req.params.pos
  const {palabra} = req.body;
  const palabras = frase.split(" ")
  palabras[pos-1]=palabra
  frase = palabras.join(" ")
  return res.status(200).json({status:"ok", data: frase});
});

app.delete('/api/palabras/:pos', (req, res) => {
  const pos = req.params.pos;
  let palabras = frase.split(" ")
  palabras.splice(pos-1,1)
  frase = palabras.join(" ")
  return res.status(200).json({status:"ok", data: frase});
});

app.listen(PORT, () => console.log(`Escuchando puerto ${PORT}`));
