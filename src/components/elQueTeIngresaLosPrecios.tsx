
// import { v4 as uuidv4 } from 'uuid';
import { capitalize, sortBy } from "lodash";
import { ChangeEvent, Fragment, useState } from "react";
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

  return <div className="grid grid-cols-[3fr_100px_100px_1fr_1fr_2fr_50px] gap-2">
    <>
      <div>Nombre</div>
      <div>Compra</div>
      <div>Venta</div>
      <div>Unidad</div>
      <div>Ganancia</div>
      <div>Clase</div>
      <div>Borrar</div>
    </>
    {productos.map(p => <Fragment key={p._id}>
      <LineaProducto p={p} />
    </Fragment>)}
  </div>
}

const LineaProducto = ({ p }: { p: IProducto }) => {

  const unidades: TUnidad[] = ["kg", "at", "l", "u"]
  const clases: TClase[] = ["fruta", "verdura", "hongo", "almacen"]

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
    <NumberInput value={producto.precioCompra} onChange={n => handleEditar({ precioCompra: n })} />
    <NumberInput value={producto.precioVenta} onChange={n => handleEditar({ precioVenta: n })} />
    <SelectInput value={producto.unidad} onChange={e => handleEditar({ unidad: e.target.value as TUnidad })}>
      {unidades.map(u => <option key={u} value={u}>{capitalize(u)}</option>)}
    </SelectInput>
    <p className="text-sm place-self-center">{((producto.precioVenta / producto.precioCompra - 1) * 100).toFixed(1)}% (${producto.precioVenta - producto.precioCompra})</p>
    <SelectInput value={producto.clase} onChange={e => handleEditar({clase: e.target.value as TClase})}>
      {clases.map(c => <option key={c} value={c}>{capitalize(c)}</option>)}
    </SelectInput>
    <button onClick={() => borrarProducto(producto)}>X</button>
  </>
}

const Menu = () => {
  const { cargarJson, agregarProducto, setProductos } = useStorage();
  const new_id = uuidjs.UUID.generate()
  const vacio = { "_id": new_id, nombre: "", precioVenta: 0, precioCompra: 0, unidad: "kg", clase: "verdura" } as IProducto

  return <div className="flex w-64 justify-evenly">
    <button className="px-2 whitespace-nowrap" onClick={() => setProductos(ps => sortBy(ps, p => p.nombre))}>Ordenar</button>
    {/* <button className="px-2 whitespace-nowrap" onClick={cargarJson}>Cargar json</button> */}
    <button className="px-2 whitespace-nowrap" onClick={() => agregarProducto(vacio)}>Agregar</button>
  </div>
}