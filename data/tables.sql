BEGIN;
DROP TABLE IF EXISTS "list", "card", "label", "card_has_label";

CREATE TABLE IF NOT EXISTS "list" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "title" TEXT NOT NULL,
    "position" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS "card" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "title" TEXT NOT NULL,
    "color" TEXT,
    "position" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ,
    "list_code" INTEGER NOT NULL REFERENCES "list" ("id") ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS "label" (
    "id" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "title" TEXT NOT NULL,
    "color" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);
CREATE TABLE IF NOT EXISTS "card_has_label" (
    "card_code" INTEGER NOT NULL REFERENCES "card" ("id") ON DELETE CASCADE,
    "label_code" INTEGER NOT NULL REFERENCES "label" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY ("card_code", "label_code")
);
INSERT INTO "list" ("title", "position") VALUES
('Notes de Reunion', 1),
('Taches', 2),
('A noter dans l''agenda', 3),
('Notes diverses', 4);

INSERT INTO "card" ("title", "color", "position", "list_code") VALUES
('Salle Anetha, assistants: Robert, Gilles', '#202124', 1, 1),
('heure: 9h47', '#284499', 0, 1),
('reserver voiture essence', '#99286b', 1, 2),
('Penser a demander au client si la nouvelle fonctionnalite est approuve', '#829928', 1, 4);

INSERT INTO "label" ("title", "color") VALUES
('Urgent', '#289965'),
('Secretariat', '#992841'),
('Sans classification', '#286f99'),
('Client', '#997228');

INSERT INTO "card_has_label" ("card_code", "label_code") VALUES
(1, 2),
(1, 3),
(2, 2),
(3, 1),
(4, 1),
(4, 4);

COMMIT;