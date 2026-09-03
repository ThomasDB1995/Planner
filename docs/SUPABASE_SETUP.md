# Supabase setup

## Project

Supabase project:

`ovaqfqyfqjoikrikbcvt`

Project URL:

`https://ovaqfqyfqjoikrikbcvt.supabase.co`

## Doel van deze slice

Deze setup voegt alleen de Supabase-connectielaag toe.

Nog niet gedaan:

- planningdata migreren;
- employees/resources naar database schrijven;
- authenticatie bouwen;
- RLS-policies ontwerpen;
- persistence aanzetten;
- service role key gebruiken.

## Vercel environment variables

Zet in Vercel bij `Settings -> Environment Variables`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ovaqfqyfqjoikrikbcvt.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

De publishable key vind je in Supabase:

`Project Settings -> API`

Gebruik alleen de publishable/anon key voor de browserclient.

Node runtime:

- `package.json` verwacht Node `>=22 <25`;
- GitHub CI gebruikt ook Node 22;
- dit sluit aan op de huidige Supabase clientpackage.

Niet in Vercel zetten voor deze slice:

- database password;
- service role key;
- JWT secret;
- Postgres connection string.

## Code

Supabase client helper:

`src/lib/supabase/client.ts`

Deze helper:

- gebruikt alleen public Next.js env vars;
- maakt een browserclient via `@supabase/supabase-js`;
- geeft `null` terug zolang env vars ontbreken;
- verandert geen bestaande plannerflows.

## Volgende veilige stap

Na succesvolle Vercel deploy:

1. env vars in Vercel invullen;
2. redeploy uitvoeren;
3. kleine read-only healthcheck of testquery toevoegen;
4. daarna pas datamodel/RLS discovery voor plannerdata starten.
