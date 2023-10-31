type TUnidad = 'kg' | 'at' | 'u' | 'l' | 'doc'
type TClase = 'fruta' | 'almacen' | 'verdura' | 'hongo'

interface IProducto{
  _id: string,
  nombre: string,
  precioCompra: number,
  precioVenta: number,
  unidad: TUnidad,
  clase: TClase
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

type TEstado = "ingresando" | "recibido" | "visto" | "en preparacion" | "preparado" | "entregado"

interface IPedido{
  cliente: string,
  fecha: Date,
  productos: IProductoPedido[],
  total: number,
  estado: Estado
}