# DocQuery - Frontend

## Overview

DocQuery is a frontend application built with Next.js and Tailwind CSS. It provides a user-friendly interface to create powerful knowledge bases for LLMs using markdown documentation.

## Setup

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd docquery-frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Copy the example environment file and fill in the required values:

   ```sh
   cp .env.example .env
   ```

## Running the Application

1. Start the development server:

   ```sh
   npm run dev
   ```

2. The application will be available at `http://localhost:3000`.

## Features

### Key Features

- **GitHub Integration**: Easily fetch repository details and select markdown files for ingestion.
- **Markdown Processing**: Ingest and process markdown files used for documentation or detailed explanations.
- **Knowledge Base Creation**: Build comprehensive knowledge bases for LLMs from your documentation.
- **AI-Powered Insights**: Leverage advanced LLMs to generate insights and answer queries based on your knowledge base.

## Environment Variables

The application requires the following environment variables to be set:

- `TOGETHER_AI_API_KEY`
- `DATABASE_URL`

These can be set in the `.env` file.

## License

This project is licensed under the MIT License.
