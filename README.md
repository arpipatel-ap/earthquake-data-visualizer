# 🌍 Global Earthquake Dashboard

---

A responsive web application built with **React** and **Vite** that visualizes recent earthquake data from a CSV file. It features an **interactive scatter plot** and a **detailed, scrollable data table** for comprehensive analysis. This dashboard is designed to provide users with a clear and interactive way to explore earthquake events.

## ✨ Features

* **Interactive Scatter Plot**: Visualize earthquake magnitude, depth, latitude, and longitude on a dynamic scatter chart.
* **Customizable Axes**: Select different numeric variables to display on the X and Y axes using intuitive dropdowns.
* **Detailed Data Table**: View all earthquake data in a clean, scrollable table format.
* **Interactive Highlighting**: Hovering over a data point in the chart highlights the corresponding row in the table, and vice-versa. Clicking a point/row persistently selects it.
* **Responsive Design**: Optimized for desktop/laptop screens with a two-panel layout, stacking gracefully on smaller devices.
* **Styled with Tailwind CSS**: Modern and clean user interface with consistent aesthetics.
* **Local CSV Data Source**: Fetches earthquake data from a local CSV file included in the project.

## 🚀 Technologies Used

* **React**: A JavaScript library for building user interfaces.
* **Vite**: A fast frontend build tool that provides a lightning-fast development experience.
* **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
* **Recharts**: A composable charting library built on React components.
* **Papa Parse**: A powerful in-browser CSV parser.
* **Axios**: A promise-based HTTP client for making API requests.

## 📦 Prerequisites

Before you begin, ensure you have the following installed on your machine:

* **Node.js** :
    * Download from [nodejs.org](https://nodejs.org/).
    * Verify your installation: `node -v` (should be `v18.x.x`, `v20.x.x`, or higher)
* **npm** (Node Package Manager) or **Yarn**:
    * `npm` comes bundled with Node.js.
    * Verify your installation: `npm -v` (should be `v9.x.x`, `v10.x.x`, or higher)

*If your Node.js/npm versions are older (e.g., v16/v7), it's highly recommended to update them to prevent compatibility issues.*

## ⚙️ Installation

Follow these steps to get the project up and running on your local machine:

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd earthquake-data-visualizer 
    ```

2.  **Install Dependencies**:
    Navigate to the project root directory and install the necessary npm packages:
    ```bash
    npm install
    ```
    This command installs core React dependencies as well as `recharts`, `papaparse`, and `axios`.

3.  **Install Tailwind CSS and its Peer Dependencies**:
    Tailwind CSS requires `postcss` and `autoprefixer` as development dependencies.
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    ```

4.  **Initialize Tailwind CSS Configuration**:
    This command will create `tailwind.config.js` and `postcss.config.js` in your project root.
    ```bash
    npx tailwindcss init -p
    ```

## ▶️ Usage

To start the development server and view the application in your browser:

```bash
npm run dev
```



