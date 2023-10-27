import { Dispatch, SetStateAction, createContext } from "react";

interface AppContextInterface{
  pedidos: IPedido[],
  setPedidos: Dispatch<SetStateAction<IPedido[]>>,
  productos: IProducto[],
  setProductos: Dispatch<SetStateAction<IProducto[]>>,
  textoPedido: string,
  setTextoPedido: Dispatch<SetStateAction<string>>,
  pedido: IPedido,
  setPedido: Dispatch<SetStateAction<IPedido>>,
  levantado: boolean,
  setLevantado: Dispatch<SetStateAction<boolean>>
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
console.log(`Creando context...`)
export const AppContext = createContext<AppContextInterface>({
  pedidos: [],
  setPedidos: () => {},
  productos: [],
  setProductos: () => {},
  textoPedido: '',
  setTextoPedido: () => {},
  pedido: pedidoVacio,
  setPedido: () => {},
  levantado: false,
  setLevantado: () => {}
})