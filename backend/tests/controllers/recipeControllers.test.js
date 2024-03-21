const request = require("supertest");
const app = require("../../src/app");

describe("GET /recipes", () => {
  test("should return all the recipes", async () => {
    const response = await request(app).get("/api/recipes");

    expect(response.status).toEqual(200);
  });
});

describe("GET /recipes/:id", () => {
  test("should return one recipe", async () => {
    const response = await request(app).get("/api/recipes/1");

    expect(response.status).toEqual(200);
    expect(response.header["content-type"]).toMatch(/json/);
  });
  test("should return no recipe", async () => {
    const response = await request(app).get("/api/recipes/0([0-9]+)");

    expect(response.status).toEqual(404);
  });
});

describe("POST /evaluations", () => {
  test("should post a recipe evaluation", async () => {
    const newComment = {
      userId: 3,
      recipeId: 5,
      commentMessage: "Fantastic",
      commentNote: 5,
      commentDate: "15 Mars 2024",
    };
    const response = await request(app)
      .post("/api/evaluations")
      .send(newComment);

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");
  });
  test("should return an error", async () => {
    const commentWithMissingProps = { recipeId: 5 };
    const result = await request(app)
      .post("/api/evaluations")
      .send(commentWithMissingProps);

    expect(result.status).toEqual(422);
  });
});

describe("POST /users", () => {
  test("should create a user", async () => {
    const newUser = {
      firstname: "sly",
      lastname: "B",
      pseudo: "YOO",
      email: "malavida@gmail.com",
      password: "1234",
      role: "user",
    };
    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toEqual(200);
  });
});
