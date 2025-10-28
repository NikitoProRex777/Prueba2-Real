// src/data/product.ts

export interface Producto {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  alt: string;
  brand: string;
  description: string;
  technology?: string; // (El '?' lo hace opcional)
  availableSizes: string[]; // <-- ¡CORRECCIÓN! Esta línea es nueva
}

// Un array de tallas de ejemplo para reutilizar
const TALLAS_COMUNES = ["US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10", "US 11", "US 12"];

export const TodoslosProductos: Producto[] = [
  // --- TUS 7 PRODUCTOS ORIGINALES ---
  {
    id: 'p1',
    name: 'Dame X',
    price: 120000,
    imageUrl: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/fdbb7b3d39f64ae0a41b8e4ac0e149aa_9366/Zapatillas_Dame_X_Negro_JP6090_01_00_standard.jpg',
    alt: 'Zapatillas Dame X',
    brand: 'Adidas',
    description: 'Las Dame X celebran a Damian Lillard. Diseñadas para el clutch, ofrecen una amortiguación Bounce Pro ligera y una suela con agarre superior para cortes rápidos.',
    technology: 'Bounce Pro',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p2',
    name: 'Adidas Harden Vol. 9',
    price: 110000,
    imageUrl: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/7765415ffc944868860294b4f1b32a6f_9366/Harden_Volume_9_Rojo_JS1304_01_00_standard.jpg',
    alt: 'Adidas Harden Vol. 9',
    brand: 'Adidas',
    description: 'El futuro del baloncesto. Las Harden Vol. 9 combinan un diseño futurista con la comodidad de la amortiguación JET BOOST, ideal para creadores de juego.',
    technology: 'JET BOOST',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p3',
    name: 'Anthony Edwards 1 Low',
    price: 150000,
    imageUrl: 'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/e33dcc08e33e4950b92f41895017201c_9366/Zapatillas_Anthony_Edwards_1_Low_Turquesa_JQ6135_01_00_standard.jpg',
    alt: 'Zapatillas Anthony Edwards 1 Low',
    brand: 'Adidas',
    description: 'Ligeras y explosivas, las AE 1 Low están hechas para el estilo de juego de "Ant-Man". Perfectas para jugadores que atacan el aro sin piedad.',
    technology: 'Lightstrike',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p4',
    name: 'Luka Doncic Luka .77',
    price: 130000,
    imageUrl: 'https://nikeclprod.vtexassets.com/arquivos/ids/1402989-1200-1200?v=638888885307530000&width=1200&height=1200&aspect=true',
    alt: 'Luka Doncic Luka .77',
    brand: 'Nike (Jordan)',
    description: 'Inspiradas en el estilo de juego de Luka, estas zapatillas ofrecen soporte y ligereza. El "Luka .77" es un homenaje a su número de la suerte.',
    technology: 'Formula 23 Foam',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p5', 
    name: 'Anta Kai 2', 
    price: 125000, 
    imageUrl: 'https://anta.com/cdn/shop/files/ANTA-KAI-2-Triple-Black-Media-3_900x.jpg?v=1748327213', 
    alt: 'Anta Kai 2',
    brand: 'Anta', 
    description: 'Las zapatillas de Kyrie Irving. Diseñadas para el control y la creatividad en la cancha.', 
    technology: 'A-SHOCK',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p6', 
    name: 'Jordan Air 1 Mid', 
    price: 220000, 
    imageUrl: 'https://nikeclprod.vtexassets.com/arquivos/ids/1214803-1200-1200?v=638726464510200000&width=1200&height=1200&aspect=true', 
    alt: 'Jordan Air 1 Mid',
    brand: 'Nike (Jordan)', 
    description: 'El ícono que lo empezó todo. Un clásico atemporal que combina estilo urbano y herencia del baloncesto.', 
    technology: 'Air-Sole',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p7',
    name: 'Nike LeBron XXI',
    price: 210000,

    imageUrl: 'https://nikeclprod.vtexassets.com/arquivos/ids/1314532-1200-1200?v=638809440120900000&width=1200&height=1200&aspect=true',

    
 
    alt: 'Zapatillas Nike LeBron XXI',
    brand: 'Nike',
    description: 'Diseñadas para el Rey. Las LeBron XXI ofrecen un sistema de cables dinámico y amortiguación Zoom Air para un control y potencia explosivos en la cancha.',
    technology: 'Zoom Air',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },

  // --- 9 ZAPATILLAS NUEVAS (TEMPORADA 2024-2025) ---
  {
    id: 'p8',
    name: 'Nike Book 1 ',
    price: 145000,
    imageUrl: "https://nikeclprod.vtexassets.com/arquivos/ids/1294547-1200-1200?v=638804214147730000&width=1200&height=1200&aspect=true", 
    alt: "Nike Book 1 Mirage", 
    brand: 'Nike',
    description: 'La primera zapatilla signature de Devin Booker. Combina un look clásico "off-court" con tecnología de rendimiento para la cancha, inspirada en sus autos clásicos.',
    technology: 'Cushlon 2.0 & Zoom Air',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p9',
    name: 'Nike Ja 3 "Day One"',
    price: 135000,
    imageUrl: "https://nikeclprod.vtexassets.com/arquivos/ids/1486906-1200-1200?v=638968351212630000&width=1200&height=1200&aspect=true",
    alt: "Nike Ja 3 Day One", // <-- CORREGIDO (alt tag)
    brand: 'Nike',
    description: 'Tercera entrega de Ja Morant. Diseñada para un juego sin miedo, con máxima respuesta y soporte lateral para cambios de dirección explosivos.',
    technology: 'Zoom Air',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p10',
    name: 'Adidas AE 2 "The Future"',
    price: 160000,
    imageUrl: "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/0de143535947404c99350cbbea293441_9366/Zapatillas_Anthony_Edwards_2_Azul_JR4359_01_00_standard.jpg",
    alt: "Adidas AE 2 The Future", // <-- CORREGIDO (alt tag)
    brand: 'Adidas',
    description: 'La secuela de la popular AE 1. Las Anthony Edwards 2 evolucionan el diseño con una estructura de TPU más agresiva y una amortiguación Boost mejorada.',
    technology: 'Boost & Lightstrike',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p11',
    name: 'Nike Sabrina 2 "Unite"',
    price: 130000,
    imageUrl: "https://images.stockx.com/images/Nike-Sabrina-2-Doernbecher-Sophia-Womens-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1738344458",
    alt: "Nike Sabrina 2 Unite", // <-- CORREGIDO (alt tag)
    brand: 'Nike',
    description: 'La zapatilla de Sabrina Ionescu, diseñada para jugadores que cubren toda la cancha. Combina espuma React de largo completo con una unidad Zoom Air en el antepié.',
    technology: 'React & Zoom Air',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p12',
    name: 'Nike KD 17 "Sunrise"',
    price: 170000,
    imageUrl: "https://nikeclprod.vtexassets.com/arquivos/ids/1385873-1200-1200?v=638882236814730000&width=1200&height=1200&aspect=true",
    alt: "Nike KD 17 Sunrise", // <-- CORREGIDO (alt tag)
    brand: 'Nike',
    description: 'Inspiradas en las clásicas Air Max Plus, las KD 17 de Kevin Durant ofrecen una amortiguación Zoom Air grande en el antepié y una placa de TPU para estabilidad.',
    technology: 'Forefoot Zoom Air',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p13',
    name: 'Air Jordan 39 "Sol"',
    price: 225000,
    imageUrl: "https://nikeclprod.vtexassets.com/arquivos/ids/1403479-1200-1200?v=638888887301900000&width=1200&height=1200&aspect=true",
    alt: "Air Jordan 39 Sol", // <-- CORREGIDO (alt tag)
    brand: 'Nike (Jordan)',
    description: 'La última evolución de la línea insignia de Jordan. La AJ39 se enfoca en el "movimiento fluido" y la agilidad, incorporando la última versión de la placa Eclipse.',
    technology: 'ZoomX Foam & Eclipse Plate',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p14',
    name: 'New Balance Kawhi 4',
    price: 165000,
    imageUrl: "https://newbalance.cl/media/catalog/product/z/a/zapatillas-basquetbol-hombre-new-balance-kawhi-iv-rosada-lateral.png?optimize=low&bg-color=255,255,255&fit=bounds&height=650&width=650&canvas=650:650",
    alt: "New Balance Kawhi 4", // <-- CORREGIDO (alt tag)
    brand: 'New Balance',
    description: 'La zapatilla de Kawhi Leonard. Construida para el "two-way player", ofrece máxima estabilidad y retorno de energía gracias a la espuma FuelCell.',
    technology: 'FuelCell',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p15',
    name: 'Giannis Immortality 4',
    price: 180000,
    imageUrl: "https://nikeclprod.vtexassets.com/arquivos/ids/1468152-1200-1200?v=638968274844230000&width=1200&height=1200&aspect=true",
    alt: "Nike GT Hustle 3 Wembanyama", // <-- CORREGIDO (alt tag)
    brand: 'Nike',
    description: 'La elección de Victor Wembanyama. Parte de la serie G.T., la Hustle 3 está diseñada para un retorno de energía sin precedentes, ideal para jugadores explosivos.',
    technology: 'Zoom Air Strobel',
    availableSizes: TALLAS_COMUNES, // <-- AÑADIDO
  },
  {
    id: 'p16',
    name: 'Jordan Tatum 4 "Vortex"',
    price: 140000,
    imageUrl: "https://nikeclprod.vtexassets.com/arquivos/ids/1469232-1200-1200?v=638968278218030000&width=1200&height=1200&aspect=true",
    alt: "Jordan Tatum 4 Vortex", // <-- CORREGIDO (alt tag)
    brand: 'Nike (Jordan)',
    description: 'La zapatilla más ligera de la línea Jordan, diseñada para Jayson Tatum. Se centra en reducir el peso sin sacrificar el soporte, con un núcleo de espuma expuesto.',
    technology: 'Formula 23 Foam',
    availableSizes: ["US 8", "US 8.5", "US 9", "US 9.5", "US 10"], // <-- AÑADIDO (Tallas específicas)
  },
];