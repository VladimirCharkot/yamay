
// import { v4 as uuidv4 } from 'uuid';
import { capitalize } from "lodash";
import { Fragment, useState } from "react";
import * as uuidjs from 'uuidjs';

import TextInput from "@/components/input/textInput";
import SelectInput from "@/components/input/selectInput";
import NumberInput from "@/components/input/numberInput";
import useStorage from "./context/storage";

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

  const { productos } = useStorage()

  return <div className="grid grid-cols-[1fr_1fr_1fr_20px] gap-2">
    {productos.map(p => <Fragment key={p._id}>
      <LineaProducto p={p} />
    </Fragment>)}
  </div>
}

const LineaProducto = ({ p }: { p: IProducto }) => {

  const unidades: TUnidad[] = ["kg", "at", "l", "u"]

  const [producto, setProducto] = useState(p)
  const { editarProducto } = useStorage()

  const handleEditar = (update: Partial<IProducto>) => {
    const updateado = { ...producto, ...update };
    setProducto(updateado);
    editarProducto(p, update);
  };

  const { borrarProducto } = useStorage()

  return <>
    <TextInput value={producto.nombre} onChange={e => handleEditar({ nombre: e.target.value })} />
    <NumberInput value={producto.precio} onChange={n => handleEditar({ precio: n })} />
    <SelectInput value={producto.unidad} onChange={e => handleEditar({ unidad: e.target.value as TUnidad })}>
      {unidades.map(u => <option key={u} value={u}>{capitalize(u)}</option>)}
    </SelectInput>
    <button onClick={() => borrarProducto(producto)}>X</button>
  </>
}

const Menu = () => {
  const { cargarJson, agregarProducto } = useStorage();
  const new_id = uuidjs.UUID.generate()

  return <div className="flex w-64 justify-evenly">
    <button onClick={cargarJson}>Cargar json</button>
    <button onClick={() => agregarProducto({ "_id": new_id, "nombre": "", "precio": 0, "unidad": "kg" })}>Agregar</button>
  </div>
}