CREATE DATABASE tipoteka;

CREATE TABLE users(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email varchar(255) UNIQUE NOT NULL,
    password varchar(32) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    avatar varchar(255) NOT NULL
);

CREATE TABLE publications(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title varchar(250) NOT NULL,
    picture varchar(255) NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    announce varchar(250) NOT NULL,
    text varchar(1000) NOT NULL,
    user_id integer NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name varchar(30) NOT NULL
);

CREATE TABLE publications_categories(
    publication_id integer NOT NULL,
    category_id integer NOT NULL,
    PRIMARY KEY (publication_id, category_id),
    FOREIGN KEY (publication_id) REFERENCES publications(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE comments(
    id integer PRIMARY KEY,
    publication_id integer NOT NULL,
    user_id integer NOT NULL,
    text text NOT NULL,
    created_at timestamp DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (publication_id) REFERENCES publications(id)
);

CREATE INDEX ON publications(title);