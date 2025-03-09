Sure! Below is a sample `README.md` for your AdonisJS project. It includes instructions on how to run the project, how to contribute, and guidelines for creating new controllers along with the necessary files (such as `.http`, validators, models, migrations, etc.).

---

# Amazing API

This is a backend project built using **AdonisJS** with **pnpm** as the preferred package manager.

## Table of Contents

- [Project Setup](#project-setup)
- [How to Run the Project](#how-to-run-the-project)
- [How to Contribute](#how-to-contribute)
- [Creating a New Controller](#creating-a-new-controller)

## Project Setup

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js**: Ensure that **Node.js** is installed (v18 or later).
- **pnpm**: Make sure **pnpm** is installed globally. If not, you can install it by running:

```bash
npm install -g pnpm
```

### Install Dependencies

Clone the repository and install the required dependencies using `pnpm`.

```bash
git clone git@github.com:so-amazing/amazing-api.git
cd amazing-api
pnpm install
```

### Environment Setup

Create a `.env` file in the root directory. You can copy the content from `.env.example`:

```bash
cp .env.example .env
```

Update the `.env` file with your database and other service credentials.

### Running the Project

To run the project in development mode, use:

```bash
pnpm dev
```

This will start the AdonisJS server, and you should be able to access the application at `http://localhost:3333`.

### Running Migrations

Before starting the application, you may need to run database migrations:

```bash
node ace migration:run
```

This will set up the database schema for your project.

### Running Tests

To run the test cases, use the following command:

```bash
pnpm test
```

## How to Contribute

We welcome contributions! Here's how you can contribute:

1. **Fork** the repository and create a new branch (`git checkout -b feature/your-feature`).
2. Make your changes in your branch.
3. **Commit** your changes (`git commit -am 'Add new feature'`).
4. **Push** your branch to your fork (`git push origin feature/your-feature`).
5. **Create a pull request**.

### Code Style

- Follow AdonisJS conventions for coding style.
- Make sure your code is well-tested.
- Add or update documentation when necessary.

## Creating Model, Controller and Migration

If you want to create model, controller and migration at once

```bash
node ace make:model modelName
```

## Creating a New Controller

When creating a new controller in this project, follow these steps:

### 1. Create the Controller

Run the AdonisJS command to generate a new controller:

```bash
node ace make:controller ControllerName
```

This will create a controller file under `app/Controllers/Http/ControllerNameController.ts`.

### 2. Create the Model

If the controller involves interacting with a model, you need to generate the model as well:

```bash
node ace make:model ModelName
```

This will create a model file under `app/Models/ModelName.ts`.

### 3. Create the Migration

If the model requires a new table in the database, generate a migration:

```bash
node ace make:migration migration_name
```

This will create a migration file under `database/migrations/`.

### 4. Create the Validator

Generate a validator for the request body validation:

```bash
node ace make:validator modelName
```

This will create a validator file under `app/Validators/modelName.ts`.

### 5. Create the `.http` File

Create a `.http` file to test your routes using the REST client. This file should be placed in the root directory or inside a folder like `tests/http/`. Here’s a sample template:

```http
### Create a new shop
POST http://localhost:3333/shops
Content-Type: application/json
Authorization: Bearer {{accessToken}}

{
  "name": "My Shop",
  "location": "Somewhere",
  "types": { "type1": "value1" },
  "deliveryInfo": { "info": "details" }
}
```

### 6. Add Routes

Make sure to add the relevant routes in `start/routes.ts` for your controller’s methods:

```ts
Route.post("/shops", "ShopsController.store");
Route.get("/shops/:id", "ShopsController.show");
Route.put("/shops/:id", "ShopsController.update");
Route.delete("/shops/:id", "ShopsController.destroy");
```

### 7. Test the Controller

Run the `.http` file you created using your editor's HTTP client or `rest.nvim` for Neovim. Ensure the API works as expected.

### 8. Add Unit Tests (Optional)

If necessary, create unit tests for the controller using AdonisJS's testing framework. You can run tests with:

```bash
pnpm test
```

---

## Folder Structure

Here’s an overview of the main folder structure:

```
.
├── app/
│   ├── Controllers/
│   ├── Models/
│   └── Validators/
├── database/
│   └── migrations/
├── start/
│   └── routes.ts
├── tests/
│   ├── unit/
│   └── functional/
├── .env
├── http/
│   └── shop.http
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Note:

- **`.http` files** are where you can easily test your API endpoints. They're helpful for testing with tools like `rest.nvim` or **VS Code's REST Client**.
- **Validators** are used to handle input validation. Make sure every incoming request (especially for `POST` and `PUT` routes) has a corresponding validator for proper validation.

---

This README provides an overview of the setup and workflow. Make sure to follow the conventions and practices outlined above when contributing or extending the project!
