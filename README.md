# Newsy 

A web application that provides summaries of news articles from RSS feeds. Built with a FastAPI backend and a React frontend, it fetches articles from user-specified RSS feeds and generates summaries with the help of OpenAI's API. The summaries are presented in Markdown format for readability.

## Features
- Fetches and displays news articles from multiple RSS feeds.
- Uses OpenAI to generate concise and structured summaries of the articles.
- Provides a user-friendly interface for managing RSS feeds and viewing summaries.
- Includes CORS middleware to support cross-origin requests from the frontend.

---

## Project Structure

- **Frontend (React)**: User interface for adding RSS feed URLs, viewing summaries, and managing feeds.
- **Backend (FastAPI)**: Endpoint for retrieving feed content and generating summaries via OpenAI API.
- **openAiApi.py**: Helper class to interact with OpenAI’s API.
- **feedManager.py**: Helper module for fetching data from RSS feeds.

---

## Getting Started

### Prerequisites

- [Python 3.8+](https://www.python.org/)
- [Node.js 16+ (for frontend)](https://nodejs.org/)
- [OpenAI API Key](https://platform.openai.com/signup/)

### Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TallenPeli/newsy
   cd newsy
   ```

2. **Setup the backend (FastAPI)**:
   - Create and activate a virtual environment:

     ```bash
     python3 -m venv .venv
     source .venv/bin/activate  # for bash
     source .venv/bin/activate.fish  # for fish shell
     ```

   - Install dependencies:
     ```bash
     pip install fastapi uvicorn feedparser openai
     ```

   - Set up your OpenAI API key in a `.env` file:
     ```bash
     echo "OPENAI_API_KEY=your_openai_api_key" > .env
     ```

     Or set the environment variable in the current terminal session

     ```bash
     export OPENAI_API_KEY=your_openai_api_key
     echo $OPENAI_API_KEY
     ```

3. **Run the backend server**:
   ```bash
   fastapi dev webserver.py
   ```
   The backend will start on `http://localhost:8000`.

4. **Setup the frontend (React)**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

   The frontend will start on `http://localhost:3000` and communicate with the backend to fetch and display summaries.

---

## Usage

1. **Adding an RSS Feed**:
   - Enter an RSS feed URL in the input field and click the `+` button to add it.
   - The feed will appear in the sidebar, allowing easy access and management.

2. **Generating Summaries**:
   - After adding feeds, click the “Generate Summary” button.
   - Summaries for the selected feeds will be generated and displayed in the content area, formatted in Markdown for readability.

3. **Managing Feeds**:
   - Click the ❌ button next to each feed in the sidebar to remove it from the list.

---

## API Endpoints

- **POST /get_summary**: Accepts a list of RSS feed URLs and returns a summary for each feed.
  - **Request**: JSON object with `urls` as a list of RSS feed URLs.
  - **Response**: JSON object with `summary` in Markdown format.

Example:
```json
POST /get_summary
{
    "urls": ["https://example.com/feed1.xml", "https://example.com/feed2.xml"]
}
```

---

## License

This project is licensed under the MIT License.