# This application is created using  - React + TypeScript + Vite

# Steps to run the application in local
1. `git clone` this repo
2. `cd into the repo`
3. run `npm install`
4. run `npm run dev`
5. Open `http://localhost:5173/` in browser



# Difficulties faced while working on the application
1. I initially created the react app using nextJS. But it seems `msw ` will not work properly with nextJS and hence I had to recreate the application using Vite
2. Because of the above reason the application is not working in vercel deployment - https://zania-cards-ja63.vercel.app/ as you can see the error related to msw in the console


# Thought process while working on the application
1. Used `react-sortablejs` for drag and drop feature as it is very light weight when compared to other libraries like `react-grid-layout` and `gridstack`
2. I have built the application in a modular way. Most of the work are developed as components and hence it can be reused
3. Created and Used custom hooks wherever needed
4. Learnt about `msw` - this is new for me

