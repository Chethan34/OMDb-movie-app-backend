Table User {
  id: primary key;
  email: varchar;
  passwork: encrypted;
}

Table Movie {
  id: primary key;
  title: string;
  movie_id: number; // from api
}

Table Favorite {
  id: primary key;
  user_id: foreign key to User.id;
  movie_id: foreign key to Movie.id
}