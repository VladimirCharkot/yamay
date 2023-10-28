type TUnidad = 'kg' | 'at' | 'u' | 'l' | 'doc'

interface IProducto{
  _id: string,
  nombre: string,
  precio: number,
  unidad: TUnidad
}

interface IProductoPedido{
  textoOriginal: string,
  nombre: string,
  precioLista: number,
  precioTotal: number,
  cantidad: number,
  unidad: TUnidad

  // cantidadPedida: number,
  // unidadPedida: TUnidad,

  // precioLista: number,
  // unidadLista: TUnidad,
}

interface IMedida {
  texto: string,
  cantidad: number,
  unidad: TUnidad
}

interface IMatch {
  textoOriginal: string,
  productoMatcheado?: IProducto,
  medidaMatcheada?: IMedida
}

type TEstado = "ingresando" | "recibido" | "visto" | "preparado" | "entregado"

interface IPedido{
  cliente: string,
  fecha: Date,
  productos: IProductoPedido[],
  total: number,
  estado: Estado
}