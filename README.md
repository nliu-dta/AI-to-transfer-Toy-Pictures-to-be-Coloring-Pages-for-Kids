# ToyToColor (Python Version)

Turn your kids' favorite toys into printable coloring book pages instantly using AI (Google Gemini).

## Setup

1.  **Install uv** (if not already installed):
    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

2.  **Sync Dependencies**:
    ```bash
    uv sync
    ```

3.  **Set your API Key**:
    Set the `API_KEY` environment variable with your Google Gemini API key.
    
    *Linux/Mac:* `export API_KEY=your_key_here`
    *Windows:* `set API_KEY=your_key_here`

## Run the App

```bash
uv run streamlit run app.py
```

## Features

*   **Managed by uv**: Fast, modern Python package management.
*   **Robust Image Handling**: Uses Pillow to convert HEIC, AVIF, or Transparent PNGs to standard JPEGs for the API.
*   **Gemini 2.5 Integration**: Uses the `gemini-2.5-flash-image` model for fast image-to-image transformation.
