import { useContext, useEffect } from "react";
import { AppContext, pedidoVacio } from "./appContext";
import { findIndex, slice, sortBy } from "lodash";

// Json con defaults
import prodsJson from "@/data/productos.json"

export default function useStorage() {

  const {
    pedidos, setPedidos, 
    productos, setProductos,
    textoPedido, setTextoPedido,
    pedido, setPedido
  } = useContext(AppContext)

  useEffect(() => {
    if(process.env.DEBUG){
      console.log(`--------------`)
      console.log(`Pedidos`)
      console.log(pedidos)
      console.log(`Productos`)
      console.log(productos)
      console.log(`--------------`)
    }
  }, [pedidos, productos])


  // Guarda los productos y pedidos en localStorage
  useEffect(() => {
    if (pedidos.length > 0) {
      console.log(`Guardando pedidos en localstorage...`)
      localStorage.setItem('pedidos', JSON.stringify(pedidos))
    }
  }, [pedidos])

  useEffect(() => {
    if (productos.length > 0) {
      console.log(`Guardando productos en localstorage...`)
      localStorage.setItem('productos', JSON.stringify(productos))
    }
  }, [productos])

  // Carga los productos y pedidos de localStorage
  useEffect(() => {
    console.log(`Levantando productos y pedidos...`)

    const prodsLocal = localStorage.getItem('productos')
    if (prodsLocal !== null) {
      const ps = JSON.parse(prodsLocal)
      setProductos(sortBy(ps, p => p.nombre))
      console.log(ps)
    }
    
    const pedsLocal = localStorage.getItem('pedidos')
    if (pedsLocal !== null) {
      const ps = JSON.parse(pedsLocal)
      setPedidos(sortBy(ps, p => p.nombre))
      console.log(ps)
    }

  }, [setPedidos, setProductos])


  // Carga en productos los del json
  const cargarJson = () => {
    setProductos(sortBy(prodsJson, p => p.nombre))
  }


  // Administra la lista de productos
  const agregarProducto = (p: IProducto) => {
    setProductos(ps => [p, ...ps])
  }

  const borrarProducto = (p: IProducto) => {
    setProductos(ps => ps.filter(prod => prod.nombre != p.nombre && prod.unidad == p.unidad))
  }

  const editarProducto = (p: IProducto, u: Partial<IProducto>) => {
    const index = findIndex(productos, prod => prod.nombre == p.nombre)
    setProductos([...slice(productos, 0, index), { ...p, ...u }, ...slice(productos, index + 1)])
  }


  // Administra la lista de pedidos

  const ingresarPedido = () => {
    if (pedido.cliente == "") { alert("Ingresale un nombre che"); return }
    setPedidos(ps => ([...ps, { ...pedido, estado: "recibido" }]))
    setPedido(pedidoVacio)
    setTextoPedido("")
  }


  return {
    pedidos, productos, setPedidos, setProductos,
    cargarJson, agregarProducto, borrarProducto, editarProducto,
    textoPedido, setTextoPedido, pedido, setPedido, ingresarPedido
  }

}