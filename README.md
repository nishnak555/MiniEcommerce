# 🛍️ Mini E-commerce App

A lightweight and responsive e-commerce mobile application built with **React Native**. This app includes essential shopping features like product listing, product detail view, add-to-cart, and cart management with persistent state.

---

## 🚀 Project Objective

Create a mini e-commerce app using React Native with the following core features:

### 📋 Requirements

#### 1. Product List Page
- Display products in a grid view fetched from a remote API.
- Each product displays:
  - Title
  - Price
  - Image
  - Rating

#### 2. Product Detail Page
- On product selection, navigate to a detail screen showing:
  - Product Description
  - Price
  - Image
  - Rating & Rating Count
  - **"Add to Cart"** button

#### 3. Cart Functionality
- A cart screen to:
  - View added items
  - Update item quantities
  - Display total cart value
  - Persist cart using local storage (`AsyncStorage`)

#### 4. State Management
- Use **Context API** or **Redux** for managing global cart state.

---

## 📦 Tech Stack

- React Native CLI
- React Navigation
- Context API / Redux
- Axios / Fetch API
- AsyncStorage

---

## 🧪 Setup & Installation

### Prerequisites
- Node.js >= 14.x
- React Native CLI
- Android Studio / Xcode setup for running simulators

### 🔧 Steps

1. **Clone the repo**

```bash
git clone https://github.com/nishnak555/MiniEcommerce.git
cd mini-ecommerce-app

## Create build command 
cd android
./gradlew assembleRelease
