# Contribuer à Gilets Jaunes 2026

Merci de contribuer au projet. Cette application est construite avec **Astro**, **React**, **TypeScript**, **Tailwind CSS** et **pnpm**.

> Important : les commandes documentées ici utilisent uniquement `pnpm`.

## Prérequis

- Node.js 20 ou supérieur
- pnpm 9 ou supérieur
- Un projet Supabase accessible

Vérifiez votre installation :

```bash
node --version
pnpm --version
```

## Installation locale

Depuis la racine du dépôt :

```bash
pnpm install
```

Lancez ensuite le serveur de développement :

```bash
pnpm dev
```

La preview Astro est disponible sur [http://localhost:4321](http://localhost:4321).

## Configurer Supabase en local

L'endpoint `/api/visits` utilise les variables d'environnement côté serveur. Si elles sont absentes, l'API renvoie :

```json
{"error":"Supabase is not configured."}
```

### 1. Créer le fichier local d'environnement

À la racine du projet, copiez le modèle :

```bash
cp .env.example .env
```

Si `.env.example` n'existe pas encore, créez un fichier `.env` à la racine du projet.

### 2. Ajouter les variables Supabase

Dans `.env`, ajoutez les variables suivantes :

```dotenv
# URL racine du projet Supabase.
# Utilisez https://<project-ref>.supabase.co
# et non l'URL REST complète se terminant par /rest/v1.
SUPABASE_URL=https://votre-project-ref.supabase.co

# Clé secrète serveur uniquement.
# Ne préfixez jamais cette variable par PUBLIC_ et ne la placez jamais dans du code client.
SUPABASE_SECRET_KEY=votre-cle-secrete-supabase
```

Pour le projet de production, `SUPABASE_SERVICE_ROLE_KEY` peut être utilisé à la place de `SUPABASE_SECRET_KEY`. L'application accepte les deux noms, mais `SUPABASE_SECRET_KEY` est prioritaire.

### 3. Où trouver ces valeurs dans Supabase ?

1. Ouvrez le dashboard Supabase.
2. Sélectionnez votre projet.
3. Allez dans **Project Settings → Data API** pour récupérer l'URL du projet.
4. Allez dans **Project Settings → API** ou **API Keys**.
5. Copiez une clé secrète serveur adaptée à votre projet.

Ne copiez pas `/rest/v1` dans `SUPABASE_URL`. Par exemple :

```text
Correct   : https://bjzbbgoasjdzxsgblzzg.supabase.co
Incorrect : https://bjzbbgoasjdzxsgblzzg.supabase.co/rest/v1
```

### 4. Redémarrer Astro

Astro charge les variables d'environnement au démarrage du serveur. Après toute modification de `.env`, arrêtez puis relancez la preview :

```bash
pnpm dev
```

Testez ensuite l'endpoint :

```bash
curl http://localhost:4321/api/visits
```

Une réponse fonctionnelle ressemble à ceci :

```json
{"viewsCount":12451}
```

Chaque appel valide lit puis incrémente la ligne `id = 1` de la table `site_stats`.

## Table Supabase requise

La table doit contenir une ligne d'identifiant `1` :

```sql
create table if not exists public.site_stats (
  id bigint primary key,
  views_count bigint not null default 0
);

insert into public.site_stats (id, views_count)
values (1, 0)
on conflict (id) do nothing;
```

L'endpoint utilise la clé secrète uniquement côté serveur afin de pouvoir lire et mettre à jour cette statistique sans exposer de privilèges à l'utilisateur. Ne rendez jamais cette clé disponible via une variable `PUBLIC_*`.

## Sécurité des secrets

- `.env` et `.env.*` sont ignorés par Git.
- Ne committez jamais une clé Supabase secrète.
- Ne partagez jamais une clé secrète dans une issue, un commit ou une capture d'écran.
- Si une clé a été exposée, révoquez-la immédiatement depuis le dashboard Supabase et générez-en une nouvelle.
- Le fichier `.env.example` doit contenir uniquement des noms de variables et des valeurs fictives.

## Scripts utiles

```bash
pnpm dev       # serveur Astro avec rechargement automatique
pnpm build     # build de production
pnpm preview   # tester le build de production localement
pnpm astro     # accéder directement à la CLI Astro
```

Avant une pull request, lancez au minimum :

```bash
pnpm build
```

## Pull requests

1. Créez une branche dédiée : `git switch -c feat/ma-fonctionnalite`.
2. Gardez les changements ciblés et typés.
3. Vérifiez la preview mobile et desktop.
4. Vérifiez qu'aucun secret ou fichier `.env` n'est inclus.
5. Décrivez le changement et les étapes de validation dans la pull request.

Merci de contribuer à une mobilisation numérique accessible, rapide et respectueuse des données personnelles.
