import { Fragment } from "react"
import useStorage from "./context/storage"

export default function ElQueTeMuestraLosPedidos() {

  const {pedidos} = useStorage()

  return <div>
    <ul>
      {pedidos.map(p => <Fragment key={p.cliente + p.fecha}>
        <Pedido pedido={p} />
      </Fragment>)}
    </ul>
  </div>
}

interface PedidoProps {
  pedido: IPedido
}

function Pedido({ pedido }: PedidoProps) {

  // Wee fix para boletear
  if (typeof (pedido.fecha) == typeof (""))
    pedido.fecha = new Date(pedido.fecha)

  const shadow = `shadow-white`
  const box = `m-5 p-2 max-w-2xl`

  return <div className={`border ${shadow} ${box}`} style={{boxShadow: '0px 0px 8px'}}>
    <Header pedido={pedido}/>
    <ProductosPedidos pedido={pedido}/>
  </div>
}

const Header = ({pedido} : {pedido: IPedido}) => {
  return <div className="flex justify-between align-baseline">
      <div className="text-2xl">{pedido.cliente}</div>
      <div className="text-xs">{pedido.fecha.toLocaleString()}</div>
    </div>
}

const ProductosPedidos = ({pedido} : {pedido: IPedido}) => {
  return <ul className="m-4 grid grid-cols-[2fr_1fr_1fr_1fr] content-baseline gap-x-2">
      {pedido.productos.map(pr =>
        <Fragment key={pr.nombre}>
          <div>{pr.nombre}</div>
          <div>x {pr.cantidadPedida} {pr.unidadPedida}</div>
          <div className="text-xs self-end">x ${pr.precioLista} / {pr.unidadLista}</div>
          <div>${pr.precio}</div>
        </Fragment>
      )}
      <><div /><div /><div /><div className="border-t w-full">${pedido.total}</div></>
    </ul>
}