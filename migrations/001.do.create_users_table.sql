CREATE TABLE users (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    password TEXT NOT NULL UNIQUE,
    datecreated TIMESTAMPTZ NOT NULL DEFAULT NOW() 
)