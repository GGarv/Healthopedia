# Multi-Agent MATLAB Troubleshooting Assistant

This project implements an advanced multi-agent system using LangGraph, designed to assist users with MATLAB-related queries. It intelligently orchestrates multiple AI agents to understand user problems, retrieve relevant information from internal knowledge bases and the web, analyze root causes, propose solutions, and deliver synthesized, actionable responses via an API.

## Core Features

*   **Natural Language Query Understanding:** Accepts user queries via a FastAPI endpoint. (Diagram: User Query -> FastAPI Endpoint)
*   **Agentic Problem Decomposition (Implied):** Initial nodes (LangGraph Supervisor/Problem Definition in Diagram) likely preprocess the query for downstream agents.
*   **Multi-Source Information Gathering:**
    *   **Internal Knowledge Base RAG:** Queries two distinct ChromaDB vector stores (e.g., one for Stack Overflow, one for MATLAB Docs) using specialized RAG agents (`rag_root_cause`, `rag_solution`).
    *   **Web Search:** Employs a dedicated ReAct agent (`web_searcher`) using Groq Llama 3 and Tavily Search for external information retrieval. (Diagram: Agent 1)
*   **Hybrid Search (Retrieval + Reranking):** Enhances RAG relevance by first retrieving documents using semantic similarity (`thenlper/gte-small`) and then reranking them with a Cross-Encoder (`BAAI/bge-reranker-base`).
*   **Root Cause & Solution Analysis:** Dedicated agents (`rag_root_cause`, `rag_solution`) analyze information specifically to identify underlying issues and potential fixes based on internal knowledge. (Diagram: Agent 4, Agent 5)
*   **Intelligent Synthesis:** A `synthesizer` agent (Diagram: Fusion Node) aggregates and synthesizes findings from all sources (RAG, Web Search) into a single, coherent Markdown report.
*   **Structured Output & API Delivery:** The final report is delivered as a JSON response via the FastAPI endpoint, suitable for integration with web applications or directly within MATLAB. (Diagram: LangGraph END NODE -> FastAPI returns JSON response)
*   **Feedback Mechanism (Conceptual):** The architecture includes a "Feedback Admin Panel" connected to the synthesis step, suggesting a mechanism for refining responses based on user/admin feedback (Diagram Feature).
*   **Modular & Orchestrated:** Built using LangGraph for clear workflow definition, state management (`AppState`), and robust agent coordination.

## Model Architecture & Workflow

The system follows a multi-stage pipeline orchestrated by LangGraph, integrating information from various specialized agents:

**(Based on Diagram & Code Implementation)**

1.  **Input & Initial Processing:**
    *   A user submits a `query` via a **FastAPI Endpoint**.
    *   *(Diagram Suggestion)*: A `LangGraph Supervisor Node` might initially route or manage the query flow, potentially passing it to a `Problem Definition Node` for clarification or decomposition (This specific pre-processing isn't detailed in the provided agent code but is a common pattern).

2.  **Internal Knowledge Analysis (RAG Agents - Code Implementation):**
    *   **`analyze_rag_root_cause` Node (`agents/rag_root_cause`):**
        *   Receives the `query`.
        *   Performs RAG (Retrieve -> Rerank -> Generate with Gemini) against **both ChromaDB stores** (representing MATLAB Docs & Stack Overflow sources from the diagram - Agent 2/3 sources).
        *   Focuses on identifying the root cause using `ROOT_CAUSE_PROMPT`.
        *   Updates `AppState` with `rag_root_cause_analysis`.
    *   **`find_rag_solution` Node (`agents/rag_solution`):**
        *   Receives the `AppState`.
        *   Performs RAG similarly against both ChromaDB stores.
        *   Focuses on finding solutions using `SOLUTION_PROMPT`.
        *   Updates `AppState` with `rag_solution`.

3.  **External Information Gathering (Web Search Agent - Code Implementation):**
    *   **`execute_web_search` Node (`agents/web_searcher`):**
        *   Receives the `AppState`.
        *   Invokes the **ReAct agent** (Groq Llama 3 + Tavily Search) to search the web based on the original `query`. (Diagram: Agent 1)
        *   Updates `AppState` with `web_search_result`.

4.  **Synthesis & Report Generation (Code Implementation):**
    *   **`synthesize_final_report` Node (`agents/synthesizer`):** (Diagram: Fusion Node)
        *   Receives the `AppState` containing `query`, `rag_root_cause_analysis`, `rag_solution`, and `web_search_result`.
        *   Uses **Gemini LLM** with `SYNTHESIS_PROMPT` to combine all gathered information into a structured **Markdown report**.
        *   Handles missing information gracefully.
        *   *(Diagram Suggestion)*: This node conceptually connects to the **Feedback Admin Panel**.
        *   Updates `AppState` with `final_report`.

5.  **Output Delivery:**
    *   The LangGraph workflow reaches its `END` state.
    *   The final `AppState`, containing the `final_report` (and potentially citation info, as suggested by the diagram), is processed.
    *   The **FastAPI endpoint** returns the results as a **JSON response**.
    *   This JSON response can be consumed by a **Web Application** or integrated into **MATLAB** via API calls.

## Efficient Data Storage & Knowledge Base Preparation (ChromaDB)

The foundation of the internal analysis relies on efficiently structured knowledge bases stored in ChromaDB.

*   **Vector Store Choice:** ChromaDB is used as the vector store, providing efficient local storage and retrieval based on semantic similarity.
*   **Dual Database Strategy:** Two separate ChromaDB instances (`DB1_PATH`, `DB2_PATH`) are utilized. This allows for logical separation of distinct knowledge sources, such as:
    *   `DB1`: Official MATLAB Documentation (Diagram: Agent 3 Source)
    *   `DB2`: Community discussions like Stack Overflow Q&A (Diagram: Agent 2 Source)
    *   This separation could potentially allow for source-specific weighting or targeted querying in future enhancements.
*   **Ingestion & Embeddings:** Documents (MATLAB doc pages, Stack Overflow threads) must be ingested into ChromaDB separately. During ingestion:
    *   Text is chunked appropriately.
    *   Embeddings are generated using `thenlper/gte-small`.
*   **Crucial Role of Metadata:** To maximize efficiency and relevance, **adding rich metadata during ingestion is highly recommended**:
    *   **`source`:** URL or file path of the original document (Essential for citation).
    *   **`doc_type`:** e.g., 'matlab_doc', 'stackoverflow_question', 'matlab_example'.
    *   **`matlab_version`:** If applicable to the documentation or solution.
    *   **`tags` / `keywords`:** Relevant MATLAB functions, toolboxes, concepts (e.g., 'fft', 'plotting', 'simulink', 'optimization').
    *   **`timestamp`:** Original creation/modification date of the source.
    *   **`question_id` / `answer_id`:** For Stack Overflow data.
    *   **How Metadata Enhances the System:**
        *   **Filtering:** Allows RAG retrievers to pre-filter documents *before* semantic search (e.g., "only search official docs from version R2023b"). *[Note: Current RAG code doesn't show explicit metadata filtering, but it's a key advantage of ChromaDB].*
        *   **Citation:** Enables accurate source attribution in the final response (as suggested by "Answers + Citation" in the diagram).
        *   **Relevance Tuning:** Can be used alongside semantic scores to boost results from specific sources or time periods.
        *   **Contextualization:** Provides the LLM with better context about the retrieved information's origin.
*   **Access Mechanism:** The RAG agents use the `gte-small` embeddings for initial retrieval and `bge-reranker-base` to refine the top `TOP_K_RETRIEVAL` documents down to the most relevant `TOP_K_FINAL` documents for the LLM context.

## Agentic Design & Innovation

*   **Orchestrated Collaboration:** LangGraph manages the complex interactions between specialized agents, ensuring a structured approach to problem-solving.
*   **Specialized Roles:** Each agent (RAG-RootCause, RAG-Solution, Web-Search, Synthesizer) focuses on a distinct sub-task, leveraging specific prompts and tools (LLMs, Search APIs, Vector Stores).
*   **Hybrid Information Sources:** Combines the reliability of curated internal knowledge bases (MATLAB Docs, Stack Overflow) with the breadth and timeliness of external web search.
*   **Advanced RAG:** Moves beyond simple vector search by incorporating a reranking step for improved precision.
*   **ReAct Pattern:** The web searcher utilizes the sophisticated ReAct pattern for dynamic, multi-step interaction with the Tavily search tool.
*   **Synthesis Power:** The dedicated synthesizer is key to creating value by transforming raw data from multiple agents into a user-friendly, actionable report.
*   **Feedback Integration (Potential):** The architecture diagram includes a feedback loop, indicating a design for continuous improvement based on real-world usage.

## Technology Stack

*   **Orchestration:** LangGraph
*   **Core LLM Framework:** LangChain
*   **LLMs:**
    *   Google Gemini (via `gen_models.llm` for RAG & Synthesis)
    *   Groq Llama 3 70B (`llama3-70b-8192` via `langchain-groq` for Web Search Agent)
*   **Vector Database:** ChromaDB (`langchain-chroma`, `chromadb`)
*   **Embeddings:** Hugging Face `thenlper/gte-small` (`langchain-huggingface`)
*   **Reranking:** Sentence Transformers `BAAI/bge-reranker-base` (`sentence-transformers`)
*   **Web Search Tool:** Tavily AI API (`langchain-community`, `tavily-python`)
*   **API Framework:** FastAPI (Implied by Diagram)
*   **State Management:** Python `TypedDict`
*   **Environment Management:** `python-dotenv`
*   **Supporting Libraries:** PyTorch (`torch`), `uvicorn` (for FastAPI)

## Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```
2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv venv
    source venv/bin/activate # On Windows use `venv\Scripts\activate`
    ```
3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
    *(Ensure `requirements.txt` includes: `langchain`, `langgraph`, `langchain-huggingface`, `langchain-chroma`, `sentence-transformers`, `torch`, `langchain-groq`, `langchain-community`, `tavily-python`, `google-generativeai`, `python-dotenv`, `chromadb`, `fastapi`, `uvicorn`)*
4.  **Prepare Knowledge Bases (Vector Stores):**
    *   Run your separate data ingestion scripts to populate the ChromaDB databases specified by `DB1_PATH` and `DB2_PATH`.
    *   **Crucially, include relevant metadata during this ingestion process.**
    *   Default paths: `./vectorstore/db_chroma` and `./vectorstore1/db_chroma`.
5.  **Configure Environment Variables:**
    *   Create a `.env` file in the project root.
    *   Add the following, replacing placeholders:

    ```dotenv
    # --- RAG Configuration ---
    DB1_PATH="vectorstore/db_chroma"
    DB2_PATH="vectorstore1/db_chroma"
    EMBEDDING_MODEL="thenlper/gte-small"
    RERANKER_MODEL="BAAI/bge-reranker-base"
    TOP_K_RETRIEVAL=20
    TOP_K_FINAL=5

    # --- API Keys ---
    GOOGLE_API_KEY="<your-google-api-key>" # For Gemini (RAG/Synthesis)
    GROQ_API_KEY="<your-groq-api-key>"     # For Llama 3 (Web Search)
    TAVILY_API_KEY="<your-tavily-api-key>" # For Tavily Search Tool

    # --- Optional: Model Names ---
    # GEMINI_MODEL_NAME="gemini-pro"
    # GROQ_MODEL_NAME="llama3-70b-8192"
    ```
