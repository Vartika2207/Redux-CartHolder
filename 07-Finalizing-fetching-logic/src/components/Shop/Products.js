import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'Book',
    description: 'Books are amazing to read',
  }, 
  {
    id: 'p2',
    price: 6,
    title: 'Pen',
    description: 'Blue Parket pen',
  }, 
  {
    id: 'p3',
    price: 6,
    title: 'Laptop',
    description: 'Lenovo T14s i7',
  }, 
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
        />
        ))}
        
      </ul>
    </section>
  );
};

export default Products;
