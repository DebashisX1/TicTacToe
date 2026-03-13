# ❌ TicTacToe ⭕

A high-performance, responsive, and feature-rich TicTacToe web application. This project elevates the classic game with dual-grid mechanics, persistent statistical tracking, and an interactive visual dashboard.

## 🚀 Live Demo
**[Link your GitHub Pages URL here]**

## 🌟 Key Features

### 🕹️ Dynamic Gameplay
* **Dual Game Modes**: Switch seamlessly between the classic **3x3** grid and a more strategic **4x4** grid. 
* **Responsive Engine**: The game board and logic dynamically adjust based on the selected grid size, including specialized winning combination detection for each mode.

### 📊 Advanced Analytics & Persistence
* **Persistent Data**: All-time high scores and daily streaks are saved via `localStorage`, ensuring player progress survives page refreshes.
* **Visual Winning Stats**: A custom-built vertical bar chart that scales dynamically based on relative player performance.
* **Daily Streak System**: Separate goal tracking (Target: 5 wins) for both players across both grid modes.

### 🎨 Modern UI/UX
* **Glassmorphism Design**: Translucent panels with `backdrop-filter` blur effects and subtle border glows.
* **Celebration Logic**: Integration of `canvas-confetti` to trigger visual rewards upon streak completion.
* **Three-Tier Reset System**:
    * **Restart**: Clear the current board.
    * **Reset Stats**: Clear current session scores.
    * **Hard Reset**: Wipe all-time records and `localStorage` data.

## 🛠️ Tech Stack

* **HTML5**: Semantic structure and layout.
* **CSS3**: Custom Grid/Flexbox layouts, CSS animations, and media queries for mobile responsiveness.
* **JavaScript (ES6+)**: Vanilla JS for game state, win-checking algorithms, and data persistence.
* **Canvas-Confetti**: External library for high-fidelity particle effects.

## 📂 Project Structure

```text
tictactoe/
├── index.html        # UI Structure and DOM elements
├── style.css         # Animations, Glassmorphism, and Responsive Design
├── script.js        # Game logic, LocalStorage, and Charting
└── src/
    ├── icon/         # Application icons
    └── images/       # Background assets