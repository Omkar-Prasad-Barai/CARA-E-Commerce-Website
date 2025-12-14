import type { Product } from '../context/CartContext';

export const featuredProducts: Product[] = [
  { id: 'f1', brand: 'adidas', name: 'Cartoon Astronaut T-Shirts', price: 499, image: '/images/products/f1.jpg' },
  { id: 'f2', brand: 'adidas', name: 'Floral Summer Shirt', price: 650, image: '/images/products/f2.jpg' },
  { id: 'f3', brand: 'adidas', name: 'Vintage Classic T-Shirt', price: 899, image: '/images/products/f3.jpg' },
  { id: 'f4', brand: 'adidas', name: 'Tropical Print Shirt', price: 1200, image: '/images/products/f4.jpg' },
  { id: 'f5', brand: 'adidas', name: 'Urban Denim Shirt', price: 1450, image: '/images/products/f5.jpg' },
  { id: 'f6', brand: 'adidas', name: 'Retro Striped T-Shirt', price: 750, image: '/images/products/f6.jpg' },
  { id: 'f7', brand: 'adidas', name: 'Cotton Linen Trousers', price: 1399, image: '/images/products/f7.jpg' },
  { id: 'f8', brand: 'adidas', name: 'Casual Graphic Tee', price: 550, image: '/images/products/f8.jpg' },
];

export const newArrivals: Product[] = [
  { id: 'n1', brand: 'adidas', name: 'Polo Collar T-Shirt', price: 899, image: '/images/products/n1.jpg' },
  { id: 'n2', brand: 'adidas', name: 'Slim Fit Chinos', price: 1299, image: '/images/products/n2.jpg' },
  { id: 'n3', brand: 'adidas', name: 'Oversized Hoodie', price: 1499, image: '/images/products/n3.jpg' },
  { id: 'n4', brand: 'adidas', name: 'Summer Shorts', price: 499, image: '/images/products/n4.jpg' },
  { id: 'n5', brand: 'adidas', name: 'Running Sneakers', price: 1350, image: '/images/products/n5.jpg' },
  { id: 'n6', brand: 'adidas', name: 'Sports Trackpants', price: 950, image: '/images/products/n6.jpg' },
  { id: 'n7', brand: 'adidas', name: 'Classic Leather Belt', price: 450, image: '/images/products/n7.jpg' },
  { id: 'n8', brand: 'adidas', name: 'Canvas Backpack', price: 1100, image: '/images/products/n8.jpg' },
];

export const allProducts: Product[] = [...featuredProducts, ...newArrivals];
