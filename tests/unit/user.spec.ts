import { test } from "@japa/runner";
import User from "#models/user";

test.group("Users", () => {
  let user: User;

  test("it should return all users (index)", async ({ client }) => {
    const response = await client.get("/api/users");
    response.assertStatus(200);
  });

  test("it should create a new user (store)", async ({ client, assert }) => {
    const response = await client.post("/api/users").json({
      fullName: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    response.assertStatus(201);
    user = response.body();
    assert.exists(user.id, "User ID should exist");
  });

  test("it should return a single user (show)", async ({ client }) => {
    const response = await client.get(`/api/users/${user.id}`);
    response.assertStatus(200);
  });

  test("it should update a user (update)", async ({ client }) => {
    const response = await client.put(`/api/users/${user.id}`).json({
      username: "updateduser",
    });

    response.assertStatus(200);
    response.assertBodyContains({ fullName: "updateduser" });
  });

  test("it should delete a user (delete)", async ({ client }) => {
    const response = await client.delete(`/api/users/${user.id}`);
    response.assertStatus(204);
  });
});
