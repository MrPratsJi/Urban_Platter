import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Pizza
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
    price: 12.99,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Pizza',
    rating: 4.5,
    isVeg: true,
    prepTime: 25
  },
  {
    id: '2',
    name: 'Pepperoni Supreme',
    description: 'Loaded with pepperoni, cheese, and Italian herbs',
    price: 16.99,
    image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Pizza',
    rating: 4.7,
    isVeg: false,
    prepTime: 30
  },
  {
    id: '3',
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken with BBQ sauce and red onions',
    price: 18.99,
    image: 'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Pizza',
    rating: 4.6,
    isVeg: false,
    prepTime: 35
  },

  // Burgers
  {
    id: '4',
    name: 'Classic Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce',
    price: 10.99,
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Burgers',
    rating: 4.4,
    isVeg: false,
    prepTime: 15
  },
  {
    id: '5',
    name: 'Veggie Deluxe Burger',
    description: 'Plant-based patty with avocado and fresh vegetables',
    price: 11.99,
    image: 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Burgers',
    rating: 4.3,
    isVeg: true,
    prepTime: 12
  },
  {
    id: '6',
    name: 'Chicken Deluxe',
    description: 'Grilled chicken breast with bacon and cheese',
    price: 13.99,
    image: 'https://images.pexels.com/photos/552056/pexels-photo-552056.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Burgers',
    rating: 4.8,
    isVeg: false,
    prepTime: 18
  },

  // Indian
  {
    id: '7',
    name: 'Butter Chicken',
    description: 'Creamy tomato curry with tender chicken pieces',
    price: 15.99,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Indian',
    rating: 4.9,
    isVeg: false,
    prepTime: 25
  },
  {
    id: '8',
    name: 'Palak Paneer',
    description: 'Fresh spinach curry with cottage cheese cubes',
    price: 13.99,
    image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Indian',
    rating: 4.5,
    isVeg: true,
    prepTime: 20
  },
  {
    id: '9',
    name: 'Biryani Special',
    description: 'Aromatic basmati rice with spiced chicken and herbs',
    price: 17.99,
    image: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Indian',
    rating: 4.8,
    isVeg: false,
    prepTime: 35
  },

  // Chinese
  {
    id: '10',
    name: 'Sweet & Sour Chicken',
    description: 'Crispy chicken with bell peppers in tangy sauce',
    price: 14.99,
    image: 'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Chinese',
    rating: 4.4,
    isVeg: false,
    prepTime: 22
  },
  {
    id: '11',
    name: 'Vegetable Fried Rice',
    description: 'Wok-fried rice with mixed vegetables and soy sauce',
    price: 11.99,
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Chinese',
    rating: 4.2,
    isVeg: true,
    prepTime: 18
  },
  {
    id: '12',
    name: 'Kung Pao Chicken',
    description: 'Spicy chicken stir-fry with peanuts and vegetables',
    price: 16.99,
    image: 'https://images.pexels.com/photos/1410236/pexels-photo-1410236.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Chinese',
    rating: 4.6,
    isVeg: false,
    prepTime: 25
  },

  // Desserts
  {
    id: '13',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie with vanilla ice cream',
    price: 7.99,
    image: 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Desserts',
    rating: 4.7,
    isVeg: true,
    prepTime: 10
  },
  {
    id: '14',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee and mascarpone',
    price: 8.99,
    image: 'https://images.pexels.com/photos/3026804/pexels-photo-3026804.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Desserts',
    rating: 4.8,
    isVeg: true,
    prepTime: 5
  },
  {
    id: '15',
    name: 'Fresh Fruit Tart',
    description: 'Buttery tart filled with custard and seasonal fruits',
    price: 9.99,
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Desserts',
    rating: 4.5,
    isVeg: true,
    prepTime: 8
  }
];

export const categories = ['All', 'Pizza', 'Burgers', 'Indian', 'Chinese', 'Desserts'];