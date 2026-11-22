# RepairLoop

**A MongoDB-Based Product Repair, Reuse and Lifecycle Management System for Sustainable Consumption**

---

> **Project Status:** Under Active Development (Planning & Design Phase)  
> **Academic Context:** Bachelor of Technology / Undergraduate Big Data Analytics (BDA) Laboratory Project  
> **Project Scope:** Individual Undergraduate Student Project

---

## 1. Introduction

Electronic waste (e-waste) is one of the fastest-growing waste streams in the world today. Many electronic items—such as laptops, smartphones, monitors, and home appliances—are thrown away while they can still be repaired, refurbished, or reused. A common reason for this problem is that repair histories, records of replaced parts, and product lifecycle details are scattered across paper receipts, disconnected spreadsheets, or simply lost over time.

**RepairLoop** is a database-focused academic project created to solve this problem. Using **MongoDB** as its core database, RepairLoop provides a centralized system to record and track the journey of electronic products from initial registration through repair events, component replacements, ownership changes, and eventual recycling.

The project demonstrates how MongoDB's document model, indexing, and multi-stage aggregation pipelines can organize product lifecycle data and generate useful sustainability analytics for repair and reuse.

---

## 2. Project Overview

RepairLoop is designed as a practical, database-centric project for an undergraduate Big Data Analytics laboratory. Rather than building an over-engineered commercial platform, the focus is on mastering MongoDB database design, query patterns, and data aggregation.

Different electronic devices have different technical specifications, and every repair job can have unique diagnostic notes and replacement parts. MongoDB is well suited for this because its flexible document structure can store diverse device attributes and variable repair records cleanly without complex relational schema migrations.

The project consists of three main components:
- **Frontend:** A clean, responsive single-page application built with **React and Vite**, using **Recharts** to display database-generated analytics.
- **Backend:** A lightweight Python web service built with **FastAPI**, using synchronous routes and the standard **PyMongo** driver to interact directly with MongoDB.
- **Database:** A local **MongoDB Community Server** instance, inspected and managed using **MongoDB Compass**.

---

## 3. Problem Statement

Consumer electronics frequently follow a wasteful "buy-use-throw" pattern. This pattern causes several practical problems:

1. **Scattered Repair Records:** When a device is repaired at a local shop or service center, the details of what was fixed and which parts were replaced are rarely stored in an accessible format.
2. **Premature Disposal:** Without an accessible repair history, owners and technicians cannot easily decide whether fixing a device is economically sensible, so working hardware gets discarded early.
3. **Lack of Insight into Faulty Components:** Fleet managers, technicians, and consumers do not have an easy way to see which parts (such as batteries, power adapters, or fans) fail most often for a given model.
4. **Untracked Product Lifecycle Milestones:** As products move from original purchase to refurbishment, donation, resale, or recycling, there is no simple audit trail to see the product's history.

---

## 4. Proposed Solution

RepairLoop addresses these challenges through a centralized, document-oriented database design:

- **Centralized MongoDB Collections:** Store product profiles, detailed repair tickets, and lifecycle milestone events in dedicated MongoDB collections.
- **Detailed Repair Event Tracking:** Record diagnostic findings, labor hours, technician observations, replaced parts, and repair expenses for each service event.
- **Chronological, Append-Oriented Lifecycle History:** Record key events (such as purchase, refurbishment, ownership transfer, or handover to a recycler) in chronological order to maintain a clear history of the product.
- **Database-Generated Analytics:** Use MongoDB aggregation pipelines to calculate practical summary metrics, such as total repair expenses, component replacement counts, and device status distributions.

---

## 5. Project Objectives

1. **Demonstrate Practical MongoDB Skills:** Apply core NoSQL concepts including document referencing, embedded sub-documents, indexing, and multi-stage aggregation pipelines (`$match`, `$group`, `$unwind`, `$lookup`, `$project`).
2. **Build a Clean, Synchronous REST API:** Implement straightforward synchronous endpoints using Python, FastAPI, and PyMongo without unnecessary architectural complexity.
3. **Track Component-Level Repairs:** Maintain organized records of replaced parts, repair costs, and repair outcomes for each registered asset.
4. **Generate Practical Sustainability Insights:** Write MongoDB aggregation queries that summarize repair frequencies and common component replacements to support sustainable product use.
5. **Provide a Simple Analytical Dashboard:** Present product details, repair histories, and chart visualizations using React (Vite) and Recharts.

---

## 6. Sustainable Development Goal (SDG) Alignment

RepairLoop aligns directly with the United Nations Sustainable Development Goals (SDGs):

```
       ┌────────────────────────────────────────────────────────┐
       │     UN Sustainable Development Goal 12 (SDG 12)        │
       │       Responsible Consumption and Production           │
       └───────────────────────────┬────────────────────────────┘
                                   │
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │                      Target 12.5                       │
       │    By 2030, substantially reduce waste generation      │
       │  through prevention, reduction, recycling and reuse    │
       └────────────────────────────────────────────────────────┘
```

RepairLoop supports SDG 12.5 by providing a structured way to track product repair, refurbishment, reuse and recycling activities. It demonstrates how organized lifecycle information can support more sustainable consumption practices.

- **Supporting Repair and Maintenance:** Keeping organized service histories helps owners and technicians maintain devices properly, encouraging product longevity rather than premature disposal.
- **Supporting Reuse:** A clear record of past repairs and component replacements builds confidence in refurbished and pre-owned devices, supporting circular reuse.
- **Supporting Responsible Recycling:** When a product reaches the end of its functional life, having recorded component and material details helps recycling centers handle the equipment properly.

---

## 7. Key Features (Planned)

### Product Management
- Register electronic devices with unique serial numbers, brand, model, category, specifications, and purchase dates.
- Update device status across defined states (`Active`, `Under Repair`, `Refurbished`, `Decommissioned`, `Recycled`).
- Search and filter products by serial number, category, or current status.

### Repair Management
- Log repair events with fault descriptions, diagnostic findings, technician notes, and total service costs.
- Record replaced components, including part names, part numbers, and component costs as embedded documents.
- Track repair outcomes (`Successful`, `Partial`, `Unrepairable`).

### Lifecycle Tracking
- Record milestone events in a chronological, append-oriented format (`Purchased`, `Ownership Transfer`, `Refurbished`, `Decommissioned`, `Sent to Recycler`).
- Connect all lifecycle events to their corresponding product using product reference identifiers.

### Database Analytics and Visualization
- **Repair Cost Summary:** Aggregate total and average repair expenses grouped by product category.
- **Component Replacement Frequency:** Unwind replacement part records to identify which parts are replaced most often.
- **Device Status Overview:** Summarize the distribution of registered devices by their current status.
- **Visual Charts:** Display database-generated summary data in bar charts and pie charts using Recharts.

---

## 8. Technology Stack

| Component | Technology | Role in Project | Justification |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | React.js (with Vite) | User Interface | Fast development setup, simple component model, and easy integration with charting tools. |
| **Data Visualization** | Recharts | Chart Rendering | Declarative React charting library that easily renders database aggregation outputs. |
| **Backend Framework** | FastAPI (Python) | REST API Service | Easy to write, provides automatic interactive API documentation (`/docs`), and works smoothly with standard Python functions. |
| **Database Driver** | PyMongo | Database Connection | Standard, official synchronous Python driver for executing queries and aggregation pipelines directly in MongoDB. |
| **Database Engine** | MongoDB Community Server | Primary Database | Flexible document model, expressive aggregation framework, and rich indexing support. **MongoDB is the only database used in this project.** |
| **Database GUI** | MongoDB Compass | Database Inspection | Visual tool for viewing collections, checking document structures, and testing aggregation queries. |

> **Single Database Note:** In strict compliance with project specifications, MongoDB is the sole database engine used. No relational databases (such as PostgreSQL or MySQL) or secondary caching stores (such as Redis) are used.

---

## 9. System Architecture

The following diagram shows how data flows through the application:

```mermaid
flowchart TD
    subgraph ClientLayer ["Frontend (React + Vite)"]
        UI["React Web Pages"]
        Charts["Recharts Visualizations"]
        UI --> Charts
    end

    subgraph BackendLayer ["Backend Service (FastAPI + PyMongo)"]
        Routes["Synchronous FastAPI Routes"]
        Schemas["Pydantic Data Schemas"]
        DBLogic["Database Queries & Aggregations"]
        PyMongoClient["PyMongo Client (Synchronous)"]

        Routes --> Schemas
        Schemas --> DBLogic
        DBLogic --> PyMongoClient
    end

    subgraph DatabaseLayer ["Database Engine (MongoDB)"]
        MongoDB[("RepairLoop Database")]
        CollP[("products collection")]
        CollR[("repair_events collection")]
        CollL[("lifecycle_events collection")]

        MongoDB --- CollP
        MongoDB --- CollR
        MongoDB --- CollL
    end

    subgraph InspectionTool ["Database GUI"]
        Compass["MongoDB Compass (Inspection Tool)"]
        Compass -.-> MongoDB
    end

    UI <-->|HTTP Requests (JSON)| Routes
    PyMongoClient <-->|Database Connection| MongoDB
```

### Data Flow Explanation
1. **User Interaction:** The user adds a product, logs a repair, or views reports in the React web interface.
2. **HTTP Request:** The frontend communicates with FastAPI by sending HTTP requests (`GET`, `POST`, `PUT`, `DELETE`) with JSON payloads.
3. **Validation & Handling:** FastAPI validates incoming request data using Pydantic schemas.
4. **Database Execution:** Synchronous Python services communicate with MongoDB through the PyMongo database connection to execute CRUD operations or aggregation pipelines.
5. **Inspection & Management:** MongoDB Compass connects directly to the local MongoDB instance as a database inspection tool for inspecting collections and validating queries.
6. **Response & Visualization:** MongoDB returns documents to the backend, which serializes them into JSON and sends them to the frontend, where Recharts renders the summary charts.

---

## 10. MongoDB Database Design & Collections

RepairLoop uses three collections: `products`, `repair_events`, and `lifecycle_events`. 

Because a single product can accumulate many repairs and lifecycle events over several years, dependent collections reference the main product using its `_id` (`product_id`). This avoids document size limits and keeps queries modular.

```
┌─────────────────────────────────┐
│            products             │
├─────────────────────────────────┤
│ _id: ObjectId                   │◄────────┐
│ serial_number: String (Unique)  │         │
│ brand: String                   │         │
│ model: String                   │         │
│ category: String                │         │
│ specifications: Object          │         │
│ purchase_date: Date             │         │
│ current_status: String          │         │
└─────────────────────────────────┘         │
                 ▲                          │
                 │                          │
                 │ (product_id reference)   │ (product_id reference)
                 │                          │
┌────────────────┴────────────────┐  ┌──────┴──────────────────────────┐
│          repair_events          │  │        lifecycle_events         │
├─────────────────────────────────┤  ├─────────────────────────────────┤
│ _id: ObjectId                   │  │ _id: ObjectId                   │
│ product_id: ObjectId            │  │ product_id: ObjectId            │
│ repair_date: Date               │  │ event_type: String              │
│ service_center: String          │  │ event_date: Date                │
│ technician_name: String         │  │ location: String                │
│ fault_description: String       │  │ recorded_by: String             │
│ parts_replaced: Array of Objects│  │ notes: String                   │
│ total_cost: Double              │  └─────────────────────────────────┘
│ outcome: String                 │
└─────────────────────────────────┘
```

---

### Collection 1: `products`
Stores primary information for each registered electronic item.

- **Purpose:** Acts as the master registry for all tracked assets.
- **Fields:**
  - `_id`: Unique BSON ObjectId created automatically by MongoDB.
  - `serial_number`: Manufacturer serial number (unique index).
  - `brand`: Device manufacturer.
  - `model`: Device model designation.
  - `category`: Product group (e.g., `Laptop`, `Smartphone`, `Monitor`).
  - `specifications`: Embedded object containing technical specifications (e.g., processor, RAM, battery capacity).
  - `purchase_date`: Date of original purchase.
  - `current_status`: Current condition (`Active`, `Under Repair`, `Refurbished`, `Decommissioned`, `Recycled`).
  - `created_at`: Date and time when the record was created.

#### Illustrative Sample Document (`products`):
```json
{
  "_id": { "$oid": "651a1b2c3d4e5f6a7b8c9d01" },
  "serial_number": "SN-LPT-2024-0042",
  "brand": "SampleBrand",
  "model": "EcoBook 14",
  "category": "Laptop",
  "specifications": {
    "processor": "Quad-Core 2.4GHz",
    "ram_gb": 16,
    "storage": "512GB SSD",
    "battery_wh": 54
  },
  "purchase_date": { "$date": "2023-01-15T00:00:00Z" },
  "current_status": "Active",
  "created_at": { "$date": "2023-01-15T10:00:00Z" }
}
```

---

### Collection 2: `repair_events`
Stores each maintenance, diagnostic, or repair job performed on a product.

- **Purpose:** Keeps an audit trail of repair actions, technicians, parts used, and costs.
- **Fields:**
  - `_id`: Unique BSON ObjectId.
  - `product_id`: Reference `ObjectId` pointing to the corresponding product in `products`.
  - `repair_date`: Date the service was completed.
  - `service_center`: Repair facility or shop name.
  - `technician_name`: Name or ID of the servicing technician.
  - `fault_description`: Description of the reported problem.
  - `diagnosis`: Root cause identified by the technician.
  - `parts_replaced`: Array of embedded sub-documents containing part details (`part_name`, `part_number`, `cost`).
  - `labor_cost`: Cost of labor.
  - `total_cost`: Combined total cost (parts + labor).
  - `outcome`: Result of repair (`Successful`, `Partial`, `Unrepairable`).

#### Illustrative Sample Document (`repair_events`):
```json
{
  "_id": { "$oid": "651a2c3d4e5f6a7b8c9d0201" },
  "product_id": { "$oid": "651a1b2c3d4e5f6a7b8c9d01" },
  "repair_date": { "$date": "2024-03-10T14:30:00Z" },
  "service_center": "Campus Electronics Repair Lab",
  "technician_name": "Alex Kumar",
  "fault_description": "Laptop battery drains in less than 30 minutes",
  "diagnosis": "Battery wear detected; charge capacity reduced to 45%",
  "parts_replaced": [
    {
      "part_name": "Replacement Battery Pack 54Wh",
      "part_number": "BAT-54WH-EB14",
      "cost": 45.00
    }
  ],
  "labor_cost": 20.00,
  "total_cost": 65.00,
  "outcome": "Successful"
}
```

---

### Collection 3: `lifecycle_events`
Stores chronological milestone events across the life of a product.

- **Purpose:** Maintains a chronological, append-oriented history of ownership, condition changes, and disposal events.
- **Fields:**
  - `_id`: Unique BSON ObjectId.
  - `product_id`: Reference `ObjectId` pointing to the related product.
  - `event_type`: Category of milestone (`Purchased`, `Refurbished`, `Ownership Transfer`, `Decommissioned`, `Recycled`).
  - `event_date`: Timestamp when the milestone occurred.
  - `location`: Facility, city, or department name.
  - `recorded_by`: Person or role entering the record.
  - `notes`: Descriptive notes about the event.

#### Illustrative Sample Document (`lifecycle_events`):
```json
{
  "_id": { "$oid": "651a3d4e5f6a7b8c9d0301" },
  "product_id": { "$oid": "651a1b2c3d4e5f6a7b8c9d01" },
  "event_type": "Refurbished",
  "event_date": { "$date": "2024-03-12T09:00:00Z" },
  "location": "Central Campus IT Depot",
  "recorded_by": "Alex Kumar",
  "notes": "Full diagnostic battery testing completed; approved for secondary assignment."
}
```

---

## 11. Major MongoDB Concepts Demonstrated

RepairLoop provides direct practical experience with core MongoDB concepts:

### 1. Document Modeling: Referencing vs. Embedding
- **Referencing (`product_id`):** Used between `products`, `repair_events`, and `lifecycle_events`. As products are serviced over several years, repair logs can grow without causing the primary product document to exceed MongoDB's 16MB document limit.
- **Embedding:** Used for tightly bounded information that does not exist independently, such as the `specifications` object in a product or individual items in the `parts_replaced` array inside a repair record.

### 2. Standard CRUD Operations
- **Create:** Inserting new product entries (`insert_one`), logging repair records, and appending lifecycle events.
- **Read:** Querying products by serial number (`find_one`), filtering items by category, and listing repair histories.
- **Update:** Changing product status (`update_one`), such as moving an item from `Active` to `Under Repair`.
- **Delete:** Removing accidental entries or soft-deleting obsolete test records (`delete_one`).

### 3. Aggregation Pipelines
MongoDB’s aggregation framework is used to produce summary statistics:
- **`$match`:** Filters documents by criteria such as date ranges or product categories.
- **`$unwind`:** Deconstructs the embedded `parts_replaced` array inside repair events so each part can be counted individually.
- **`$group`:** Computes cumulative values, such as total repair costs per category or the count of each replaced part.
- **`$lookup`:** Performs a left outer join between `products` and `repair_events` using `product_id` to show products together with their total repair expenditures.
- **`$sort` and `$project`:** Organizes and formats the pipeline output for clean presentation on the frontend.

#### Example Aggregation Pipeline (Counting Replaced Parts):
```javascript
db.repair_events.aggregate([
  { $unwind: "$parts_replaced" },
  {
    $group: {
      _id: "$parts_replaced.part_name",
      replacement_count: { $sum: 1 },
      total_parts_cost: { $sum: "$parts_replaced.cost" }
    }
  },
  { $sort: { replacement_count: -1 } },
  { $limit: 5 }
])
```

### 4. Indexing Strategies
To optimize query speed and enforce data integrity:
- **Unique Index:** Built on `serial_number` in `products` (`db.products.createIndex({ "serial_number": 1 }, { unique: true })`) to prevent duplicate registrations and make lookups fast.
- **Reference Indexes:** Created on `product_id` in both `repair_events` and `lifecycle_events` to speed up `$lookup` joins and timeline queries.
- **Status Index:** Created on `current_status` in `products` to speed up category and status filtering.

---

## 12. Planned Project Folder Structure

```
RepairLoop/
├── README.md                           # Complete project documentation
├── .gitignore                          # Standard git ignore rules
│
├── backend/                            # FastAPI Python Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                     # FastAPI application entry point & CORS
│   │   ├── config.py                   # Environment variable loader
│   │   ├── database.py                 # PyMongo connection client and collection handles
│   │   │
│   │   ├── models/                     # Pydantic data validation models
│   │   │   ├── __init__.py
│   │   │   ├── product_model.py
│   │   │   ├── repair_model.py
│   │   │   └── lifecycle_model.py
│   │   │
│   │   ├── routes/                     # Synchronous FastAPI route endpoints
│   │   │   ├── __init__.py
│   │   │   ├── products.py
│   │   │   ├── repairs.py
│   │   │   ├── lifecycle.py
│   │   │   └── analytics.py
│   │   │
│   │   └── services/                   # Business logic and aggregation queries
│   │       ├── __init__.py
│   │       ├── product_service.py
│   │       ├── repair_service.py
│   │       └── analytics_service.py
│   │
│   ├── .env.example                    # Sample backend environment file
│   └── requirements.txt                # Python dependencies (fastapi, uvicorn, pymongo, etc.)
│
└── frontend/                           # React Frontend (Vite)
    ├── index.html                      # HTML entry point for Vite
    ├── vite.config.js                  # Vite project configuration
    ├── package.json                    # Node dependencies and scripts
    ├── .env.example                    # Sample frontend environment file
    │
    └── src/
        ├── main.jsx                    # React application entry point
        ├── App.jsx                     # Top-level application layout and routes
        │
        ├── components/                 # Reusable UI components
        │   ├── Navbar.jsx
        │   ├── ProductCard.jsx
        │   └── StatusBadge.jsx
        │
        ├── pages/                      # Page views
        │   ├── ProductsPage.jsx
        │   ├── ProductDetailPage.jsx
        │   ├── AddRepairPage.jsx
        │   └── AnalyticsDashboard.jsx
        │
        └── services/                   # API client helper functions
            └── api.js
```

---

## 13. Installation & Setup Instructions

Follow these step-by-step instructions to set up the development environment locally.

### Prerequisites
- **Python:** Version 3.10 or higher
- **Node.js:** Version 18.x or higher (includes npm)
- **MongoDB Community Server:** Version 7.0 or higher running locally
- **MongoDB Compass:** Recommended for inspecting collections and documents

---

### Step 1: Clone the Project
```bash
git clone https://github.com/your-username/RepairLoop.git
cd RepairLoop
```

---

### Step 2: Ensure MongoDB Is Running
Ensure that the local MongoDB daemon is running:
- **On Windows (PowerShell as Administrator):**
  ```powershell
  net start MongoDB
  ```
- **On Linux:**
  ```bash
  sudo systemctl start mongod
  ```
- **On macOS (via Homebrew):**
  ```bash
  brew services start mongodb/brew/mongodb-community
  ```

Open **MongoDB Compass** and connect to `mongodb://localhost:27017` to verify the connection.

---

### Step 3: Backend Setup (FastAPI & PyMongo)
1. Open a terminal and change to the backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Linux / macOS
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create your local `.env` configuration file:
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env

   # Linux / macOS
   cp .env.example .env
   ```
5. Run the FastAPI development server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
6. Access the automated interactive API documentation:
   - Swagger UI: `http://localhost:8000/docs`
   - ReDoc: `http://localhost:8000/redoc`

---

### Step 4: Frontend Setup (React with Vite)
1. Open a new terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the frontend packages:
   ```bash
   npm install
   ```
3. Create the frontend environment configuration file:
   ```bash
   # Windows PowerShell
   Copy-Item .env.example .env

   # Linux / macOS
   cp .env.example .env
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the local URL shown in your terminal (typically `http://localhost:5173`).

---

## 14. MongoDB Connection & Environment Configuration

Configuration variables are managed through `.env` files to keep connection strings out of source code.

### Backend `.env` Configuration
In `backend/.env`:
```env
# Server Settings
HOST=127.0.0.1
PORT=8000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017
DATABASE_NAME=repairloop_db

# Frontend CORS URL
FRONTEND_URL=http://localhost:5173
```

### PyMongo Connection Example (`backend/app/database.py`)
The backend uses standard synchronous PyMongo operations:

```python
import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "repairloop_db")

# Create synchronous client instance
client = MongoClient(MONGODB_URI)
db = client[DATABASE_NAME]

# Collection references
products_collection = db["products"]
repair_events_collection = db["repair_events"]
lifecycle_events_collection = db["lifecycle_events"]
```

### Frontend `.env` Configuration
In `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

---

## 15. Planned API Endpoints

The FastAPI backend exposes standard REST endpoints using synchronous Python functions:

### Products (`/api/products`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/products` | Register a new product in the `products` collection. |
| `GET` | `/api/products` | Retrieve a list of products with optional category filter. |
| `GET` | `/api/products/{product_id}` | Fetch detailed information for a single product by its ObjectId. |
| `GET` | `/api/products/serial/{serial_number}` | Fetch a product using its unique serial number. |
| `PUT` | `/api/products/{product_id}` | Update product information or current status. |
| `DELETE` | `/api/products/{product_id}` | Delete a product record. |

### Repairs (`/api/repairs`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/repairs` | Log a new repair event with parts and costs. |
| `GET` | `/api/repairs/product/{product_id}` | Fetch all repair records for a specific product. |
| `GET` | `/api/repairs/{repair_id}` | Get full details of a specific repair event. |

### Lifecycle Events (`/api/lifecycle`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/lifecycle` | Add a new milestone event (refurbishment, transfer, decommission). |
| `GET` | `/api/lifecycle/product/{product_id}` | Fetch the chronological lifecycle history of a product. |

### Database Analytics (`/api/analytics`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/analytics/repair-cost-by-category` | Group repair costs by product category using `$group`. |
| `GET` | `/api/analytics/common-faulty-parts` | Identify most frequently replaced parts using `$unwind` and `$group`. |
| `GET` | `/api/analytics/status-distribution` | Summarize total devices across each status state. |

---

## 16. Example Use Cases (Illustrative Scenarios)

> *Note: The scenarios below describe illustrative sample use cases to explain how the system is intended to function.*

### Use Case 1: Logging a Battery Replacement for a University Laptop
- **Context:** A university laboratory owns laptops whose batteries degrade after extensive use.
- **Workflow:**
  1. An IT technician looks up the laptop using its serial number (`SN-LPT-2024-0042`).
  2. The system queries the `products` collection and displays the device's technical specifications and past service history.
  3. The technician logs a completed repair event: replaced component = `Replacement Battery Pack 54Wh`, part cost = \$45.00, labor cost = \$20.00, outcome = `Successful`.
  4. The completed service details are inserted into the `repair_events` collection. (Ordinary repairs do not automatically create a refurbishment event; if actual refurbishment takes place, a separate milestone is inserted into `lifecycle_events`).
  5. With the repair complete and the laptop ready for normal use, its `current_status` in the `products` collection is updated to `Active`.

### Use Case 2: Identifying Frequently Replaced Components Across a Device Fleet
- **Context:** An IT administrator wants to review which internal components are replaced most often across lab computers.
- **Workflow:**
  1. The administrator navigates to the Analytics Dashboard in the React interface.
  2. The frontend calls the `/api/analytics/common-faulty-parts` endpoint.
  3. MongoDB runs an aggregation pipeline that unwinds the `parts_replaced` array and groups by part name to calculate total replacement counts.
  4. The frontend renders a horizontal bar chart showing which components (e.g., batteries, power adapters, fans) have the highest replacement counts in the sample dataset.
  5. The administrator uses these database-generated insights to plan spare parts inventory.

---

## 17. Expected Outcomes

Upon completion, RepairLoop is expected to demonstrate:
1. **A Working Database-Driven Prototype:** A functional full-stack setup where product data, repair histories, and lifecycle records are stored cleanly in MongoDB.
2. **Database-Generated Analytics:** Clear charts on the web interface displaying aggregated repair counts, component replacement frequencies, and status distributions.
3. **Mastery of Core MongoDB Queries:** Practical application of CRUD operations, document referencing, embedded arrays, indexing, and multi-stage aggregation pipelines.
4. **Educational Alignment with SDG 12.5:** A clear software demonstration of how digital maintenance tracking supports product repair, reuse, and waste reduction.

---

## 18. Future Enhancements (Planned Considerations)

If additional development time permits after completing the core database requirements, the following enhancements may be considered:
- **QR Code Generation:** Generate printable QR codes for product serial numbers so technicians can scan and open records quickly.
- **Exporting Reports:** Provide simple CSV or JSON export buttons for aggregation query results.
- **Basic Role Filtering:** Provide separate view modes for technicians entering repairs versus administrators reviewing summary charts.

---

## 19. Project Limitations

To keep the project focused, realistic, and manageable for an individual undergraduate student, the following boundaries are set:
- **Single Database Scope:** MongoDB is the only database used. No secondary databases, SQL systems, or caching systems (e.g., Redis) are included.
- **No Machine Learning or AI Claims:** All insights are generated directly by standard MongoDB aggregation queries; no predictive machine learning models are used.
- **Student Laboratory Prototype:** The application is developed as an academic project with illustrative sample datasets rather than high-concurrency enterprise software.
- **Simple Security Model:** Focus is placed on database modeling and query logic rather than enterprise-level authentication or user permission systems.

---

## 20. License

This project is developed for educational and academic evaluation as part of the undergraduate Big Data Analytics (BDA) curriculum. 

Formal open-source licensing terms will be decided at a later stage of project development.
