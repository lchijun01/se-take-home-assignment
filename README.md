# McDonald’s Automated Order Bot Prototype

A simple Node.js + Express + Socket.IO + Bootstrap app that simulates McDonald’s order flow with VIP priority and dynamic cooking bots.

## 🔍 Overview
- **Order types**: Normal vs. VIP (VIP always processed first)  
- **Bots**: Add/remove bots at runtime; each bot picks one order, “cooks” it for 10 s, then marks it complete  
- **Real-time UI**: Bootstrap interface updates immediately via WebSocket

## ⚙️ Prerequisites
- Node.js ≥ 14  
- npm (comes with Node.js)

## 🚀 Installation & Run
1. Clone or copy this repo into your project folder.  
2. In project root, install dependencies:  
   ```bash
   npm install | npm install express socket.io
3. Start the server:
    ```bash
    node server.js
4. Open your browser at http://localhost:3000.

📋 Usage
- New Normal Order / New VIP Order – add orders to Pending

- +Bot – spin up a new cooking bot (IDs reused in ascending order)

- Remove (per-bot) – immediately requeue any in-flight order

- Lists show Pending, Completed & Bots (Idle vs. Processing Order #X)

💡 Notes & Tips
- Orders and bots live in memory; no DB needed for prototype

- Bootstrap badges/colors distinguish VIP (red) vs. Normal (gray)

- You can customize cooking time in logic/botManager.js

