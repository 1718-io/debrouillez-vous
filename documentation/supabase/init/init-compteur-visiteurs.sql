-- Création de la table pour le compteur
create table site_stats (
  id bigint primary key generated always as identity,
  views_count bigint default 0
);

-- Activer la sécurité RLS
alter table site_stats enable row level security;

-- Autoriser la lecture publique
create policy "Lecture publique" on site_stats for select using (true);

-- Autoriser la mise à jour publique du compteur
create policy "Mise à jour publique" on site_stats for update using (true);

-- Insérer la première ligne (initialisation du compteur à 1)
insert into site_stats (views_count) values (1);