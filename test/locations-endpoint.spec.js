const knex = require("knex");
const { makeUsersArray } = require("../test/users.fixtures");
const { makeLocationsArray } = require("../test/locations.fixtures");
const app = require("../src/app");
const store = require("../src/store");
const supertest = require("supertest");

describe("Locations Endpoints", () => {
  let db;
  let authToken;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  beforeEach("clean the table", () =>
    db.raw("TRUNCATE  users, locations RESTART IDENTITY CASCADE;")
  );

  beforeEach("register and login", () => {
    let users = makeUsersArray();
    return supertest(app)
      .post("/api/users")
      .send(users[0])
      .then((res) => {
        return supertest(app)
          .post("/api/auth/login")
          .send(users[0])
          .then((res2) => {
            authToken = res2.body.authToken;
          });
      });
  });

  after("disconnect from db", () => db.destroy());


  // beforeEach("copy the locations", () => {
  //   locationsCopy = store.locations.slice();
  // });

  // afterEach("restore the locations", () => {
  //   store.locations = locationsCopy;
  // });

  describe("GET /api/locations", () => {
    const testUsers = makeUsersArray();
    const testLocations = makeLocationsArray();
    context(`Given no locations`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/api/locations")

          .expect(200, []);
      });
      it.only(`responds with 200 and all locations`, () => {
        beforeEach("insert users", () => {
          return db.into("users").insert(testUsers);
        });
        beforeEach("insert location", () => {
          return db.into("locations").insert(testLocations);
        });

        return supertest(app).get("/api/locations").expect(200, testLocations);
      });
    });
    describe("GET /api/locations/:id", () => {
      context(`Given no locations`, () => {
        it(`responds 404 when location doesn't exist`, () => {
          return supertest(app)
            .get(`/api/locations/123`)

            .expect(404, {
              error: { message: `Location Not Found` },
            });
        });
      });
    });
    context("Given there are locations in the database", () => {
      const testLocations = makeLocationsArray();
      const testUsers = makeUsersArray();

      beforeEach("insert users", () => {
        return db.into("users").insert(testUsers);
      });

      beforeEach("insert location", () => {
        return db.into("locations").insert(testLocations);
      });

      it("responds with 200 and the specified location", () => {
        const locationId = 2;
        const expectedLocation = testLocations[locationId - 1];
        return supertest(app)
          .get(`/api/locations/${locationsId}`)
          .expect(200, expectedLocation);
      });
    });
  });
});
