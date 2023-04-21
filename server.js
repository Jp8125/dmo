const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
var cors = require('cors');
app.use(cors());
app.use(express.json());
// MySQL Configuration
const db = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '',
  database: 'created_ai'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database!');
});

// Products Endpoints

// Get all products
app.get('/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// Get a product by ID
app.get('/products/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result[0]);
  });
});

// Create a new product
app.post('/products', (req, res) => {
  const { name, description, price, quantity } = req.body;
  const sql = 'INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, description, price, quantity], (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Product created successfully!');
  });
});

// Update a product by ID
app.put('/products/:id', (req, res) => {
  const id = req.params.id;
  const { name, description, price, quantity } = req.body;
  const sql = 'UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?';
  db.query(sql, [name, description, price, quantity, id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Product updated successfully!');
  });
});

// Delete a product by ID
app.delete('/products/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Product deleted successfully!');
  });
});

// Categories Endpoints

// Get all categories
app.get('/categories', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// Get a category by ID
app.get('/categories/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM categories WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result[0]);
  });
});

// Create a new category
app.post('/categories', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO categories (name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if(err) {
        throw err;
        }
        res.send('Category created successfully!');
        });
        });
        
        // Update a category by ID
        app.put('/categories/:id', (req, res) => {
        const id = req.params.id;
        const { name } = req.body;
        const sql = 'UPDATE categories SET name = ? WHERE id = ?';
        db.query(sql, [name, id], (err, result) => {
        if (err) {
        throw err;
        }
        res.send('Category updated successfully!');
        });
        });
        
        // Delete a category by ID
        app.delete('/categories/:id', (req, res) => {
        const id = req.params.id;
        const sql = 'DELETE FROM categories WHERE id = ?';
        db.query(sql, [id], (err, result) => {
        if (err) {
        throw err;
        }
        res.send('Category deleted successfully!');
        });
        });
        
        // Products Categories Endpoints
        
        // Get all categories for a product
        app.get('/products/:id/categories', (req, res) => {
        const id = req.params.id;
        const sql = 'SELECT c.* FROM categories c JOIN products_categories pc ON pc.category_id = c.id WHERE pc.product_id = ?';
        db.query(sql, [id], (err, result) => {
        if (err) {
        throw err;
        }
        res.send(result);
        });
        });
        
        // Add a category to a product
        app.post('/products/:id/categories', (req, res) => {
        const product_id = req.params.id;
        const { category_id } = req.body;
        const sql = 'INSERT INTO products_categories (product_id, category_id) VALUES (?, ?)';
        db.query(sql, [product_id, category_id], (err, result) => {
        if (err) {
        throw err;
        }
        res.send('Category added to product successfully!');
        });
        });
        
        // Remove a category from a product
        app.delete('/products/:id/categories/:categoryId', (req, res) => {
        const product_id = req.params.id;
        const category_id = req.params.categoryId;
        const sql = 'DELETE FROM products_categories WHERE product_id = ? AND category_id = ?';
        db.query(sql, [product_id, category_id], (err, result) => {
        if (err) {
        throw err;
        }
        res.send('Category removed from product successfully!');
        });
        });
        
        // Orders Endpoints
        
        // Get all orders
        app.get('/orders', (req, res) => {
        const sql = 'SELECT * FROM orders';
        db.query(sql, (err, result) => {
        if (err) {
        throw err;
        }
        res.send(result);
        });
        });
        
        // Get an order by ID
        app.get('/orders/:id', (req, res) => {
        const id = req.params.id;
        const sql = 'SELECT * FROM orders WHERE id = ?';
        db.query(sql, [id], (err, result) => {
        if (err) {
        throw err;
        }
        res.send(result[0]);
        });
        });
        
        // Create a new order
        app.post('/orders', (req, res) => {
        const { customer_name, customer_email } = req.body;
        const sql = 'INSERT INTO orders (customer_name, customer_email) VALUES (?, ?)';
        db.query(sql, [customer_name, customer_email], (err, result) => {
        if (err) {
        throw err;
        }
        res.send('Order created successfully!');
        });
        });
        
        // Add an item to an order
        app.post('/orders/:id/items', (req, res) => {
          const order_id = req.params.id;
          const { product_id, quantity } = req.body;
          const sql = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)';
          db.query(sql, [order_id, product_id, quantity], (err, result) => {
            if (err) {
              throw err;
            }
            res.send('Item added to order successfully!');
          });
        });
      
        app.listen(port, () => {
          console.log(`Server is running on port ${port}.`);
        });