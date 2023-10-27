
import { AppContext, pedidoVacio } from "./appContext";
import { PropsWithChildren, useState } from "react";

export default function UseAppContext({children}: PropsWithChildren) {
  const [pedido, setPedido] = useState<IPedido>(pedidoVacio)
  const [pedidos, setPedidos] = useState<IPedido[]>([])
  const [productos, setProductos] = useState<IProducto[]>([]) 
  const [textoPedido, setTextoPedido] = useState('')
  const [levantado, setLevantado] = useState(false)

  return <AppContext.Provider value={{
    pedido, setPedido,
    pedidos, setPedidos,
    productos, setProductos,
    textoPedido, setTextoPedido,
    levantado, setLevantado
  }}>
    {children}
  </AppContext.Provider>
}