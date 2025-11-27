# Sistema de Stock por Talla 📦

## ¿Qué se agregó?

Se implementó un sistema de gestión de **stock por talla** para cada zapatilla en el catálogo. Cada producto ahora tiene un registro de cuántas unidades hay disponibles en cada talla.

---

## Cambios Realizados

### 1. **Estructura de Datos** (`src/data/producto.ts`)

Se agregó un nuevo campo a la interfaz `Producto`:

```typescript
export interface Producto {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  alt: string;
  brand: string;
  description: string;
  technology?: string;
  availableSizes: string[];
  stock: Record<string, number>; // ✨ NUEVO: Stock por talla
}
```

**Ejemplo de stock:**
```typescript
stock: {
  "US 7": 5,
  "US 7.5": 8,
  "US 8": 3,
  "US 8.5": 12,
  "US 9": 7,
  ...
}
```

### 2. **Generación de Stock Aleatorio**

Se creó una función helper para generar stock realista:

```typescript
function generateStock(tallas: string[]): Record<string, number> {
  const stock: Record<string, number> = {};
  tallas.forEach(talla => {
    stock[talla] = Math.floor(Math.random() * 15) + 1; // Stock entre 1 y 15
  });
  return stock;
}
```

Cada producto genera stock automáticamente en el rango de **1 a 15 unidades** por talla.

### 3. **Interfaz de Usuario** (`src/pages/ProductoDetalle.tsx`)

Se actualizo el componente para mostrar:
- ✅ **Stock disponible** por talla en verde
- ❌ **"Agotado"** en rojo cuando no hay stock
- Botones deshabilitados para tallas sin stock

**Ejemplo visual:**
```
Selecciona tu talla:
[US 7]      [US 7.5]    [US 8]
Stock: 5    Stock: 0    Stock: 12
            Agotado
```

### 4. **Estilos CSS** (`src/pages/ProductoDetalle.css`)

Se agregaron nuevos estilos:
- `.talla-button.sin-stock` - Talla deshabilitada (gris oscuro)
- Deshabilitación de interacción para tallas sin stock

---

## Cómo Usar el Sistema

### Acceder al Stock de un Producto

```typescript
import { TodoslosProductos } from '../data/producto.ts';

const producto = TodoslosProductos[0]; // Dame X
console.log(producto.stock); 
// { "US 7": 5, "US 7.5": 8, "US 8": 3, ... }
```

### Verificar Stock de una Talla Específica

```typescript
const tallaSeleccionada = "US 9";
const stockDisponible = producto.stock[tallaSeleccionada];

if (stockDisponible > 0) {
  console.log(`Hay ${stockDisponible} unidades disponibles`);
} else {
  console.log("Agotado");
}
```

### En el Carrito (Próximo Paso)

Cuando un cliente compra un producto con una talla específica, se podría:
1. Decrementar el stock: `producto.stock[talla]--`
2. Guardar en una base de datos
3. Sincronizar con el servidor

---

## Funcionalidades del Stock Visible en la UI

✅ **Mostrado en ProductoDetalle:**
- Cantidad exacta de stock por talla
- Botones deshabilitados para tallas agotadas
- Indicador visual de "Agotado" en rojo
- Indicador visual de stock disponible en verde

---

## Próximos Pasos Sugeridos

1. **Persistencia**: Guardar el stock en una base de datos
2. **Reducción**: Restar stock al realizar una compra
3. **Notificaciones**: Alertar cuando el stock sea bajo
4. **Panel Admin**: Crear interface para gestionar stock manualmente
5. **Historial**: Registrar cambios de stock

---

## Ejemplo Completo en ProductoDetalle

```tsx
{tallasDisponibles.map(talla => {
  const stockDisponible = product.stock[talla] || 0;
  const sinStock = stockDisponible === 0;
  
  return (
    <div key={talla}>
      <button
        disabled={sinStock}
        onClick={() => !sinStock && handleSelectSize(talla)}
      >
        {talla}
      </button>
      <small>
        {sinStock ? 'Agotado' : `Stock: ${stockDisponible}`}
      </small>
    </div>
  );
})}
```

---

**📍 Todos los tests pasan correctamente con el nuevo sistema.**
