DROP TABLE IF EXISTS favoriterecipes;
CREATE TABLE IF NOT EXISTS favoriterecipes(
	id SERIAL PRIMARY KEY,
	title VARCHAR,
	diet VARCHAR, 
	calories VARCHAR,
	servings INT,
	health VARCHAR,
	ingredient TEXT,
	link VARCHAR,
	img VARCHAR
);

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY,
	username VARCHAR UNIQUE NOT NULL,
	password_digest TEXT NOT NULL,
	email VARCHAR UNIQUE NOT NULL
);

ALTER TABLE favoriterecipes
ADD COLUMN user_id INTEGER REFERENCES users(id);