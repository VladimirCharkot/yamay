import { Dispatch, SetStateAction, createContext } from "react";

interface AppContextInterface{
  pedidos: IPedido[],
  setPedidos: Dispatch<SetStateAction<IPedido[]>>,
  productos: IProducto[],
  setProductos: Dispatch<SetStateAction<IProducto[]>>,
  textoPedido: string,
  setTextoPedido: Dispatch<SetStateAction<string>>,
  pedido: IPedido,
  setPedido: Dispatch<SetStateAction<IPedido>>
}

export const pedidoVacio = {
  cliente: "",
  fecha: new Date(),
  productos: [],
  total: 0,
  estado: "ingresando",
  pagado: false
}


// Usar a través de storage
export const AppContext = createContext<AppContextInterface>({
  pedidos: [],
  setPedidos: () => {},
  productos: [],
  setProductos: () => {},
  textoPedido: '',
  setTextoPedido: () => {},
  pedido: pedidoVacio,
  setPedido: () => {}
})