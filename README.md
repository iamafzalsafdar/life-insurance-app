# Life Insurance Recommendation Application

This is a full-stack web application built with Next.js for the frontend and Node.js (via Next.js Route Handlers) for the backend API, providing personalized life insurance recommendations based on user input. User submissions are stored in a PostgreSQL database.

## Features

*   **Frontend**: A single-page form allowing users to input their age, income, number of dependents, and risk tolerance.
*   **Personalized Recommendations**: Displays a life insurance recommendation (e.g., "Term Life – $500,000 for 20 years") along with a simple explanation after form submission.
*   **Responsive Design**: Clean and responsive UI built with Next.js, React, TypeScript, and styled using Tailwind CSS with shadcn/ui components.
*   **Backend API**: A REST API endpoint (`/api/recommendation`) built with Node.js via Next.js Route Handlers.
    *   Accepts form data (age, income, dependents, risk tolerance).
    *   Implements a simple rules-based logic for generating recommendations.
    *   Stores user submissions and the generated recommendations in a PostgreSQL database.
*   **Database**: Uses PostgreSQL, specifically integrated with Neon for a serverless database solution.

## Technologies Used

*   **Frontend**:
    *   Next.js (App Router)
    *   React
    *   TypeScript
    *   Tailwind CSS
    *   shadcn/ui
*   **Backend**:
    *   Node.js (via Next.js Route Handlers)
    *   Neon (`@neondatabase/serverless`) for PostgreSQL connectivity
*   **Database**:
    *   PostgreSQL (Neon)

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: v18.x or later (includes npm)
*   **Yarn** (recommended) or **npm**:
    \`\`\`bash
    npm install -g yarn
    \`\`\`
*   **Git**: For cloning the repository.
*   **A Neon Account**: For the PostgreSQL database. Sign up at [neon.tech](https://neon.tech/).

## Setup and Installation

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

\`\`\`bash
git clone <repository-url>
cd life-insurance-app # (Replace with your project's directory name)
\`\`\`

### 2. Install Dependencies

Using Yarn (recommended):

\`\`\`bash
yarn install
\`\`\`

Or using npm:

\`\`\`bash
npm install
\`\`\`

### 3. Database Setup (Neon)

This project uses a PostgreSQL database. We'll use Neon for a serverless PostgreSQL solution.

1.  **Create a Neon Project**:
    *   If you don't have one, sign up at [neon.tech](https://neon.tech/).
    *   Create a new project in your Neon dashboard.
2.  **Get your Connection String**:
    *   From your Neon project dashboard, navigate to "Connection Details".
    *   Copy the `DATABASE_URL` (it typically starts with `postgresql://`).
3.  **Set Environment Variables**:
    *   Create a file named `.env.local` in the root of your project.
    *   Add the `DATABASE_URL` to this file:
