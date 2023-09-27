import fs from 'fs/promises';
import path from 'path';

 class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
  }

  getProducts() {
    return this.products;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    // Validar que se estén pasando todos los parámetros
    const checkItems = title && description && price && code && thumbnail && stock;
    if (!checkItems) {
      throw new Error("Faltan ítems.");
    }

    // Verificar si el código ya existe en algún producto
    if (this.products.some(product => product.code === code)) {
      throw new Error("El código del producto ya está en uso.");
    }

    // Generar un ID único para el producto
    const id = this.generateUniqueID();

    // Crear el objeto del producto
    const product = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    // Agregar el producto al arreglo de productos
    this.products.push(product);

    // Guardar los productos en el archivo
    this.saveProducts();

    // Devolver el producto agregado
    return product;
  }

  getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }
    return product;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado.");
    }

    // No actualizamos el ID
    updatedProduct.id = this.products[index].id;

    // Actualizar el producto en la lista
    this.products[index] = {...this.products[index], ...updatedProduct, id: id};

    // Guardar los productos en el archivo
    this.saveProducts();
  }

  deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado.");
    }

    // Eliminar el producto de la lista
    this.products.splice(index, 1);

    // Guardar los productos en el archivo
    this.saveProducts();
  }

  // Función para generar un ID único (puedes ajustarla según tus necesidades)
  generateUniqueID() {
    return Math.random().toString(36).substring(2, 10);
  }
}

// Ruta del archivo donde se guardarán los productos
const filePath = path.join(__dirname, 'productos.json');

// Crear una instancia de ProductManager
const productManager = new ProductManager(filePath);

// Obtener productos (debe devolver un arreglo vacío si el archivo está vacío)
console.log(productManager.getProducts());

// Agregar un producto
const newProduct = productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

// Obtener productos nuevamente (debe incluir el producto recién agregado)
console.log(productManager.getProducts());

// Intentar agregar un producto con el mismo código (debe arrojar un error)
try {
  productManager.addProduct({
    title: "producto duplicado",
    description: "Este es un producto duplicado",
    price: 250,
    thumbnail: "Otra imagen",
    code: "abc123", // Código duplicado
    stock: 30,
  });
} catch (error) {
  console.error(error.message);
}

// Obtener un producto por ID
const productId = newProduct.id;
try {
  const foundProduct = productManager.getProductById(productId);
  console.log("Producto encontrado:", foundProduct);
} catch (error) {
  console.error(error.message);
}


