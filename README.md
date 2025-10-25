# VisionaryText: Edge OCR & AI Assistant

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/VisionaryText-20251025-032615)

VisionaryText is a cutting-edge web application designed to empower users with seamless Optical Character Recognition (OCR) capabilities directly from their browser, enhanced by intelligent AI assistance. Built on Cloudflare Workers and a React/Vite frontend, it offers a visually stunning and intuitively designed experience. Users can upload images or provide image URLs, perform OCR to extract text, and then leverage an integrated AI assistant to process, summarize, or query the extracted content. The application prioritizes a human-centered, whimsical, and expressive aesthetic with custom illustrations and playful elements, making complex tasks delightful. It's built as a single-page application focused on a core OCR workflow, with potential for expansion into advanced document analysis and interactive AI dialogues.

## Key Features

*   **Effortless OCR**: Extract text from uploaded images or image URLs directly in your browser.
*   **Live Image Preview**: Instantly see your image before initiating OCR processing.
*   **Integrated AI Assistant**: Leverage AI to process, summarize, translate, or query the extracted text.
*   **Visually Stunning UI**: Experience a human-centered, whimsical, and expressive design with custom illustrations and delightful micro-interactions.
*   **Responsive Perfection**: Enjoy a flawless and adaptive user experience across all device sizes.
*   **Cloudflare Powered**: Built on Cloudflare Workers for high-performance edge-side processing and AI capabilities.
*   **Persistent Conversations**: AI chat history is seamlessly maintained using Cloudflare Durable Objects.

## Technology Stack

VisionaryText is built with a modern and robust technology stack:

*   **Frontend**:
    *   [React](https://react.dev/) & [Vite](https://vitejs.dev/) for a fast and reactive user interface.
    *   [Tailwind CSS](https://tailwindcss.com/) for utility-first styling and rapid UI development.
    *   [Shadcn/UI](https://ui.shadcn.com/) for accessible and beautifully designed UI components.
    *   [Framer Motion](https://www.framer.com/motion/) for smooth animations and interactive polish.
    *   [Lucide React](https://lucide.dev/) for a consistent and modern icon set.
    *   [Zustand](https://zustand-demo.pmnd.rs/) for lightweight and flexible state management.
    *   [React Dropzone](https://react-dropzone.js.org/) for intuitive drag-and-drop file uploads.
*   **Backend (Cloudflare Worker)**:
    *   [Hono](https://hono.dev/) for a lightweight and fast web framework.
    *   [Cloudflare Agents SDK](https://github.com/cloudflare/agents-sdk) for stateful agent management with Durable Objects.
    *   [Model Context Protocol (MCP) Client](https://github.com/modelcontextprotocol/sdk) for real server integration.
    *   [OpenAI SDK](https://github.com/openai/openai-node) for AI model integration via Cloudflare AI Gateway.
    *   [Durable Objects](https://developers.cloudflare.com/workers/runtime-apis/durable-objects/) for persistent state and conversation history.
*   **Tooling**:
    *   [TypeScript](https://www.typescriptlang.org/) for type safety and enhanced developer experience.
    *   [Bun](https://bun.sh/) for a fast all-in-one JavaScript runtime and package manager.

## Setup and Installation

To get VisionaryText running locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/visionary-text-ai.git
    cd visionary-text-ai
    ```

2.  **Install dependencies**:
    Ensure you have [Bun](https://bun.sh/) installed.
    ```bash
    bun install
    ```

3.  **Configure Environment Variables**:
    Create a `.dev.vars` file in the root of the project (or set them in your environment) with the following:
    ```
    CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
    CF_AI_API_KEY="your-cloudflare-api-key"
    # Optional: For web search tool (if enabled in worker/tools.ts)
    # SERPAPI_KEY="your-serpapi-key"
    ```
    Replace `YOUR_ACCOUNT_ID`, `YOUR_GATEWAY_ID`, `your-cloudflare-api-key`, and `your-serpapi-key` with your actual credentials.

4.  **Run the development server**:
    ```bash
    bun run dev
    ```
    The application will be accessible at `http://localhost:3000` (or the port specified by `PORT` environment variable).

## Usage

1.  **Land on the OCR Main Interface**: You'll be greeted by the application's title and a brief description.
2.  **Input Image**:
    *   **Upload**: Drag and drop an image file into the designated area, or click to select a file.
    *   **URL**: Paste an image URL into the input field.
3.  **Live Preview**: A preview of your image will be displayed once provided.
4.  **Perform OCR**: Click the prominent "Perform OCR" button. A loading state will indicate processing.
5.  **View Extracted Text**: The extracted text will appear in the "Result Display Card".
6.  **Interact with AI**: Click the "Ask AI about this text" button to send the extracted content to the AI assistant for summarization, translation, or other queries.

## Important Note on AI Usage

Although this project has AI capabilities, there is a limit on the number of requests that can be made to the AI servers across all user apps in a given time period. Please be mindful of this when using the AI features.

## Deployment to Cloudflare Workers

To deploy VisionaryText to Cloudflare Workers:

1.  **Install Wrangler**: If you haven't already, install the Cloudflare Wrangler CLI:
    ```bash
    bun add -g wrangler
    ```

2.  **Authenticate Wrangler**:
    ```bash
    wrangler login
    ```

3.  **Build the project**:
    ```bash
    bun run build
    ```

4.  **Deploy to Cloudflare**:
    ```bash
    bun run deploy
    ```
    Wrangler will guide you through the deployment process.

Alternatively, you can use the Cloudflare Deploy Button:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/raymondhocc/VisionaryText-20251025-032615)