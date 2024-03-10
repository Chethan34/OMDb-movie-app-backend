Table User {
  id: primary key;
  email: varchar;
  passwork: encrypted;
}

Table Movie {
  id: primary key;
  title: string;
  imdb_id: number; // from api
}

Table Favorite {
  id: primary key;
  user_id: foreign key to User.id;
  imdb_id: foreign key to Movie.imdb_id
}