CREATE TABLE IF NOT EXISTS review_sessions (
  token       TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  project_name TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS review_comments (
  id           SERIAL PRIMARY KEY,
  session_token TEXT NOT NULL REFERENCES review_sessions(token) ON DELETE CASCADE,
  x_percent    FLOAT NOT NULL,
  y_percent    FLOAT NOT NULL,
  comment      TEXT NOT NULL,
  author_name  TEXT NOT NULL DEFAULT 'Client',
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  resolved     BOOLEAN DEFAULT FALSE
);
