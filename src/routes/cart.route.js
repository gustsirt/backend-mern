const { Router } = require("express");
const { CartManager } = require("../manager/CarManager");

const router = Router()
const carrito = new CartManager('./src/mock/Carts.json')

// GET http://localhost:8080/api/carts/:cid
router.get('/:cid' , async (req, res) => {
  const id = req.params.cid
  const resp = await carrito.getCarts(5) 

  if (typeof (resp) === "string") {
    res.status(400).json({
      status: "fail",
      data: resp
  })} else {
    res.status(200).json({
      status: "ok",
      data: resp
  })}
})

// POST http://localhost:8080/api/carts/
router.post('/' , async (req, res) => {

  const id = await carrito.create()

  res.status(200).json({
    status: "ok",
    data: id
})
})

// POST http://localhost:8080/api/carts/:cid/product/:pid
router.post('/:cid/product/:pid' , async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  const resp = await carrito.addProduct(cid,pid)

  if (typeof (resp) === "string") {
    res.status(400).json({
      status: "fail",
      data: resp
  })} else {
    res.status(200).json({
      status: "ok",
      data: resp
  })}
})

exports.cartsRouter = router;