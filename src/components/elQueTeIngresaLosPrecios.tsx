import { capitalize } from "lodash"
import { Fragment, useEffect, useState } from "react"

import TextInput from "@/components/input/textInput"
import SelectInput from "./input/selectInput"
import NumberInput from "./input/numberInput"

import useStorage from "./context/storage"

export default function ElQueTeIngresaLosPrecios() {

  const { productos } = useStorage()

  return <>
    <div className="flex justify-between w-full">
      <div>Productos: {productos.length}</div>
      <Menu />
    </div>
    <GrillaProductos />
  </>
}

const GrillaProductos = () => {

  const { productos, editarProducto } = useStorage()

  // Problema: editarProducto llama a setProductos y eso actualiza productos
  // y se re-renderean los inputs, haciendome perder focus
  return <div className="grid grid-cols-[1fr_1fr_1fr_20px] gap-2">
    {productos.map(p => <Fragment key={p.nombre}>
      <LineaProducto p={p} onEdit={editarProducto}/>
    </Fragment>)}
  </div>
}

const LineaProducto = ({p, onEdit}: {p: IProducto, onEdit: (p: IProducto, u: Partial<IProducto>) => void}) => {
  const productoVacio = {
    nombre: '',
    precio: 0,
    unidad: ''
  }
  const unidades: TUnidad[] = ["kg", "at", "l", "u"]

  const [producto, setProducto] = useState<IProducto>(productoVacio)

  const handleEditar = (update: Partial<IProducto>) => {
    const updateado = { ...producto, ...update };
    setProducto(updateado);
    onEdit(producto, update);
  };

  const {editarProducto, borrarProducto } = useStorage()

  return <>
    <TextInput value={p.nombre} onChange={e => handleEditar({ nombre: e.target.value })} />
    <NumberInput value={p.precio} onChange={n => handleEditar({ precio: n })} />
    <SelectInput value={p.unidad} onChange={e => handleEditar({ unidad: e.target.value })}>
      {unidades.map(u => <option key={u} value={u}>{capitalize(u)}</option>)}
    </SelectInput>
    <button onClick={() => borrarProducto(p)}>X</button>
  </>
}

const Menu = () => {
  const { cargarJson, agregarProducto } = useStorage();

  return <div className="flex w-64 justify-evenly">
    <button onClick={cargarJson}>Cargar json</button>
    <button onClick={() => agregarProducto({ "nombre": "", "precio": 0, "unidad": "kg" })}>Agregar</button>
  </div>
}