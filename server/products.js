import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const products = {
  cheerios: { price: 3.00 },
  cornflakes: { price: 2.50 },
  frosties: { price: 10.00 },
  shreddies: { price: 12.00 },
  weetabix: { price: 5.50 }
};

app.get('/products/:name', (req, res) => {
  const product = products[req.params.name.toLowerCase()];
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(3001, () => {
  console.log('Product API server running on port 3001');
});