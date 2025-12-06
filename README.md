# E-Commerce Product Management App

A React-based e-commerce application with product management and admin functionality.

## Features

- **Product Catalog**: Browse and view products with detailed information
- **Product Details**: Click "More Info" on any product to view full details
- **Admin Features**: Admin users can edit and update product information
- **Shopping Cart**: Add products to cart functionality
- **User Authentication**: Login/Register system with role-based access

## Admin Functionality

### Test Admin Account
- **Username**: `admin`
- **Password**: `admin123`

### Admin Features
1. **Edit Products**: Admin users see "Edit Product" button on product detail pages
2. **Update Product Info**: Modify title, description, price, category, and image
3. **Create Products**: Access to product creation page
4. **Admin Badge**: Navigation shows "(Admin)" badge for admin users

## How to Test Product Details & Admin Features

1. **Start the application**:
   ```bash
   npm run dev
   ```

2. **Browse Products**:
   - Go to `/products` page
   - Click "More Info →" on any product to view details

3. **Test Admin Features**:
   - Login with admin credentials (username: `admin`, password: `admin123`)
   - Navigate to any product detail page
   - You'll see "Edit Product" button (only visible to admins)
   - Click to edit and modify product information
   - Save changes to update the product

4. **Regular User Experience**:
   - Login with regular user or browse without login
   - Product details page shows product info without edit capabilities
   - Add to cart functionality available for all users

## User Accounts

### Admin User
- Username: `admin`
- Password: `admin123`
- Role: Admin (can edit products)

### Regular Users
- Username: `johnd`
- Password: `m38rmF$`

- Username: `harsh1234`
- Password: `1234`

## Project Structure

- `/src/pages/admin/ProductDetails.jsx` - Product detail page with admin edit functionality
- `/src/pages/Products.jsx` - Product catalog page
- `/src/actions/productActions.jsx` - Product CRUD operations
- `/backend/db.json` - JSON database with products and users

## Technologies Used

- React + Vite
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- JSON Server for backend simulation
