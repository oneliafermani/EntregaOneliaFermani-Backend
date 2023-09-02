    class ProductManager {
        constructor() {
        this.products = [];
        }
    
        getProducts() {
        return this.products;
        }
    
        addProduct({ title, description, price, thumbnail, code, stock }) {
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
    
        // Función para generar un ID único (puedes ajustarla según tus necesidades)
        generateUniqueID() {
        return Math.random().toString(36).substring(2, 10);
        }
    }
    
    // Crear una instancia de ProductManager
    const productManager = new ProductManager();
    
    // Obtener productos (debe devolver un arreglo vacío)
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
    