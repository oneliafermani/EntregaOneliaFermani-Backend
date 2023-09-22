import express from 'express';
import ProductManager from './ProductManager';


const app = express();
const port = 8080;


const productManager = new ProductManager(__dirname + '/productos.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;

    // Obtener productos con límite 
    const products = await productManager.getProducts(limit);

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productManager.getProductById(pid);

    if (product) {
      res.status(200).json({ product });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
