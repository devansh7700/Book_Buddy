# Capstone Project Proposal — Library Management API

## **Project Concept**

In the **Library Management API**, it is a back-end application that will enable libraries to efficiently manage books, users, and rules of borrowing books.  
It offers a safe and systematically organized manner in which the librarians will deal with book stock, book borrowing, and user reviews.

I have selected this theme due to its practicality, simplicity, and representation of a completed CRUD based system with authentication, authorization and data relationships.  
It also permits adding a valuable new back-end element, like automated email notifications or planned actions against books that are overdue.

## **Scope and Functionality**

The API will include the following main entities:

1. **Books**
   - Fields: `id`, `title`, `author`, `genre`, `isbn`, `status` (available/borrowed)
   - CRUD: Add, update, delete, and list books
   - Additional: Search by author/genre/title

2. **BorrowRecords**
   - Fields: `id`, `bookId`, `userId`, `borrowDate`, `dueDate`, `returnDate`
   - CRUD: Record borrowing and returning of books
   - Additional: Track overdue books

3. **Reviews**
   - Fields: `id`, `bookId`, `userId`, `rating`, `comment`
   - CRUD: Users can leave, edit, or delete reviews

### **Endpoints (Examples)**

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/books` | Add a new book |
| `GET` | `/api/books` | Get list of all books |
| `GET` | `/api/books/:id` | Get details of a specific book |
| `PUT` | `/api/books/:id` | Update book details |
| `DELETE` | `/api/books/:id` | Delete a book |
| `POST` | `/api/borrow` | Create a new borrow record |
| `PUT` | `/api/borrow/:id/return` | Mark a book as returned |
| `GET` | `/api/borrow` | List all borrow records |
| `POST` | `/api/reviews` | Add a review for a book |
| `GET` | `/api/reviews/:bookId` | Get all reviews for a book |

### **Data Needs**

- Firebase Firestore will contain user, book, borrow record and reviews.
- User registration and login will be done by Firebase Authentication.

## **Course Content Alignment**

| **Feature / Component**                | **Aligned Course Topic** |
|----------------------------------------|--------------------------|
| RESTful API using Express + TypeScript | Core back-end development concepts |
| Firestore Database Integration         | Cloud database and CRUD operations |
| Firebase Authentication                | Secure user authentication and authorization |
| Role-Based Access Control              | Middleware and custom claims |
| Validation using Joi                   | Data validation and error handling |
| Swagger / OpenAPI                      | API documentation |
| Jest Unit Tests                        | Testing and CI integration |
| dotenv, helmet.js, CORS                | Environment management and security best practices |
| GitHub Workflow (branches, issues, CI) | Version control and collaboration |
| **New Component (Extension)**          | **Node-cron for automated tasks** (outside core course scope, planned for approval) |

### **New Component Plan (Planned Enhancement)**

I will also incorporate Node-cron to create a schedule task every day, which will update on the overdue borrow records and send notification emails (through Nodemailer) to the users.  
This is an example of research and incorporation of a new back-end component not included in the main course.

## **GitHub Project Setup**

- Repository name: `Book_Buddy`
- Branching strategy:
  - `main` – final stable version
  - `development` – staging branch for integration
  - `feature/*` – branches for individual features (e.g., `feature/books-crud`)

### **Project Board**

| **Milestone**               | **Goal**         | **Issues**                  |
|-----------------------------|------------------|-----------------------------|
| **Pre-Milestone (Week 0)**  | Project Planning | Create proposal document, set up repo and project board |
| **Milestone 1 (Weeks 1–2)** | Initial Setup & CRUD | Initialize project, implement of CRUD , set up Swagger, write unit tests |
| **Milestone 2 (Week 3)**    | Sprint Demo & Component Integration | New component integration, prepare 5–8 minute sprint demo |
| **Milestone 3 (Weeks 4–5)** | Final Touches & Completion | Finish Node-cron notifications, finalize testing, polish code, and prepare final demo |


