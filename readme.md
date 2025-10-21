Technologies

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Multer (for file uploads)

Installation

Clone the repository:

git clone https://github.com/yourusername/cipherstudio-backend.git
cd cipherstudio-backend


Install dependencies:

npm install


Start the server:

npm run dev


Server runs on http://localhost:5000
 by default.

Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>

API Routes
User Routes
Method	Endpoint	Description	Body Parameters
POST	/api/users	Register a new user	name, email, password
POST	/api/users/login	Login user and return JWT	email, password
GET	/api/users/:id	Get user info (optional)	N/A
Project Routes
Method	Endpoint	Description	Body Parameters
POST	/api/projects	Create a new project	name
GET	/api/projects/:userId	Get all projects of a user	N/A
PUT	/api/projects/:id	Update a project	name
DELETE	/api/projects/:id	Delete a project	N/A
File Routes
Method	Endpoint	Description	Body Parameters
POST	/api/files	Create a new file	projectId, parentId (optional), name, type ("file" or "folder"), content
GET	/api/files/:id	Get a file by ID	N/A
PUT	/api/files/:id	Update file (rename or content update)	name (optional), content (optional)
DELETE	/api/files/:id	Delete a file	N/A
Example Request
Create Project
POST /api/projects
Headers:
  Authorization: Bearer <JWT_TOKEN>
Body:
{
  "name": "MyProject"
}

Add File to Project
POST /api/files
Headers:
  Authorization: Bearer <JWT_TOKEN>
Body:
{
  "projectId": "<project_id>",
  "parentId": null,
  "name": "src/App.js",
  "type": "file",
  "content": "export default function App() { return <div>Hello</div>; }"
}

Usage

Start backend server

Use frontend (CipherStudio React IDE) to call backend routes

Save projects, create files/folders, edit code, and preview live

License

MIT License © 2025


