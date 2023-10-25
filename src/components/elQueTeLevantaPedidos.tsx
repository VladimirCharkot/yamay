import TextInput from './input/textInput'
import useStorage from './context/storage'

export default function ElQueTeLevantaPedidos() {

  const { ingresarPedido } = useStorage()

  return <div className='flex flex-col items-center justify-between max-w-36'>
    <Nombre />
    <TextAreaPedido />
    <GrillaPedido />
    <button className="border" onClick={ingresarPedido}>Ingresar</button>
  </div>
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

  const {textoPedido, setTextoPedido} = useStorage()

  const border = 'border border-dashed border-amber-100 focus:outline-none'
  const bg = 'bg-transparent hover:bg-amber-900 focus:bg-amber-800'
  return <>
    <p className={`self-start`}>Lista:</p>
    <textarea className={`p-2 ${border} ${bg}`}
      onChange={e => setTextoPedido(e.target.value)} value={textoPedido} name="pedido" id="pedido" cols={30} rows={10} />
  </>
}


const GrillaPedido = () => {

  const { pedido } = useStorage()

  const grid = 'grid grid-cols-[3fr_30px_3fr_1fr_10px_1fr_30px_1fr] gap-x-2'

  return <>
    <ul className={`text-white m-4 ${grid}`}>{pedido.productos.map((prd, i) => <>
      <div key={i} className='text-right'>{prd.textoOriginal}</div>
      <div>-&gt;</div>
      <div className='text-right'>{prd.nombre}</div>
      {prd.unidadPedida && <>
        <div className='text-right'>{prd.cantidadPedida} {prd.unidadPedida}</div>
        <div>x</div>
        <div className='text-left'>${prd.precioLista} / {prd.unidadLista}</div>
        <div> --&gt; </div>
        <div>${prd.precio}</div>
      </>}
      {!prd.unidadPedida && <><div /><div /><div /><div /><div /></>}
    </>)}
      <>
        <div /><div /><div /><div /><div /><div /><div />
        <div className='border-t'>${pedido.total}</div>
      </>
    </ul>
  </>
}