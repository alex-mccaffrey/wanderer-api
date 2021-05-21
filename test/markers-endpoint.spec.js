const knex = require("knex");
const { makeUsersArray } = require("./users.fixtures");
const { makeMarkersArray } = require("./markers.fixtures");
const app = require("../src/app");
const store = require("../src/store");
const supertest = require("supertest");

describe("Markers Endpoints", () => {
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
    db.raw("TRUNCATE  users, markers RESTART IDENTITY CASCADE;")
  );

  beforeEach("register and login", () => {
    let user = { username: "authtestuser", password: "P@ssword12!" };
    //let users = makeUsersArray();
    return supertest(app)
      .post("/api/users")
      .send(user)
      .then((res) => {
        return supertest(app)
          .post("/api/auth/login")
          .send(user)
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
  describe("GET /api/markers", () => {
    context("Given there are users and markers in database", () => {
      const testMarkers = makeMarkersArray();
      const testUsers = makeUsersArray();
      beforeEach("insert users", () => {
        return db
          .into("users")
          .insert(testUsers)
          .then(() => {
            return db.into("markers").insert(testMarkers);
          });
      });

      it("responds with 200 and markers", () => {
        const expectedMarkers = [
          {
            id: 1,
            userId: "1", 
            name: "Buck",
            notes: "this is a note",
            latitude: "39.780899",
            longitude: "-105.0273788",
            timeAdded: '2021-05-11T15:49:45.329Z',

        },
        {
            id: 2,
            userId: "1",
            name: "Alex",
            notes: "this is also a note", 
            latitude: "39.778888",
            longitude: "-104.8721969",
            timeAdded: '2021-05-11T15:49:45.329Z',

    
        },
        {
            id: 3,
            userId: "1", 
            name: "Mike",
            notes: "this is another note",
            latitude: "39.714322",
            longitude: "-104.949101259", 
            timeAdded: '2021-05-11T15:49:45.329Z',
  
        },
        ];
        return supertest(app)
          .get("/api/markers")
          .set("Authorization", `bearer ${authToken}`)
          .expect(200, expectedMarkers);
      });
    });
  });


  describe("POST /api/markers", () => {
    it("creates a day, responding with 201 and new markers", () => {
      const newMarker = {
            name: "Buck",
            notes: "this is a note",
            latitude: "39.780899",
            longitude: "-105.0273788",
            timeAdded: '2021-05-11T15:49:45.329Z',
      };
      return supertest(app)
        .post("/api/markers")
        .set("Authorization", `bearer ${authToken}`)
        .send(newMarker)
        .expect(201)
        .expect((res) => {
          expect(res.body.text1).to.equal(newMarker.text1);
          expect(res.body.text2).to.equal(newMarker.text2);
          expect(res.body.text3).to.equal(newMarker.text3);
        });
    });
    const requiredFields = ["name", "notes", "latitude", "longitude"];

    requiredFields.forEach((field) => {
      const newMarker = {
        name: "Buck",
        notes: "this is a note",
        latitude: "39.780899",
        longitude: "-105.0273788",
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newMarker[field];

        return supertest(app)
          .post("/api/markers")
          .set("Authorization", `bearer ${authToken}`)
          .send(newMarker)
          .expect(400, {
            error: { message: `'${field}' is required` },
          });
      });
    });
  });
});
