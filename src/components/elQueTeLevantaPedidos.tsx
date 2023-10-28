import TextInput from './input/textInput'
import useStorage from './context/storage'
import useParser from './context/parsePedido'
import { Fragment } from 'react'
import { find } from 'lodash'

export default function ElQueTeLevantaPedidos() {

  return <div className='flex flex-col items-center justify-between max-w-36'>
    <Nombre />
    <TextAreaPedido />
    <GrillaPedido />
    <BotonIngresarPedido/>
  </div>
}


const BotonIngresarPedido = () => {
  const { ingresarPedido } = useStorage()
  return <button className="rounded-lg bg-amber-100 text-amber-800 p-2" onClick={ingresarPedido}>Ingresar</button>
}


const Nombre = () => {

  const { pedido, setPedido } = useStorage()

  return <>
    <p className='self-start'>Pedido de:</p>
    <TextInput value={pedido.cliente} onChange={e => setPedido(p => ({ ...p, cliente: e.target.value }))}
      tw="text-2xl p-2 m-2 border" />
  </>
}


const TextAreaPedido = () => {

  const { textoPedido, setTextoPedido } = useParser()

  const border = 'border border-dashed border-amber-100 focus:outline-none'
  const bg = 'bg-transparent hover:bg-amber-900 focus:bg-amber-800'
  return <>
    <p className={`self-start`}>Lista:</p>
    <textarea className={`p-2 ${border} ${bg}`}
      onChange={e => setTextoPedido(e.target.value)} value={textoPedido} name="pedido" id="pedido" cols={30} rows={10} />
  </>
}


const GrillaPedido = () => {

  const { pedido, textoPedido } = useStorage()

  const lineas = textoPedido.split('\n').map(linea => ({linea, producto: find(pedido.productos, p => p.textoOriginal == linea)}))

  const grid = 'grid grid-cols-[2fr_30px_2fr_1fr_10px_1fr_30px_1fr] gap-x-2'

  return <>
    <ul className={`text-sm md:text-lg text-white m-4 ${grid}`}>{lineas.map((l, i) => <Fragment key={i}>
      <div key={i} className='text-right'>&quot;{l.linea}&quot;</div>
      <div>-&gt;</div>
      {l.producto && <>
        <div className='text-right'>{l.producto.nombre}</div>
        <div className='text-right'>{l.producto.cantidad} {l.producto.unidad}</div>
        <div>x</div>
        <div className='text-left'>${l.producto.precioLista} / {l.producto.unidad}</div>
        <div> → </div>
        <div>${l.producto.precioTotal}</div>
      </>}
      {!l.producto && <>
      <div className='text-right'>No entendo</div>
      <div className='text-right'>--</div>
      <div>x</div>
      <div>--</div>
      <div />
      <div>$0</div></>}
    </Fragment>)}

      {/* Línea de total: */}
      <>
        <div /><div /><div /><div /><div /><div /><div />
        <div className='border-t'>${pedido.total}</div>
      </>
    </ul>
  </>
}