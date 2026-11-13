# React + Vite

## Portfolio and Supabase setup

This portfolio uses React, Vite, and Supabase for its published blog and private post dashboard.

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_CONTACT_EMAIL`.
3. Run `npm run dev`.
4. In the Supabase SQL Editor, run [`supabase/schema.sql`](supabase/schema.sql). This also creates the public `blog-covers` image bucket; only allowlisted admins can upload images up to 5 MB.
5. In **Authentication → Users**, create the owner account. Public sign-up is not implemented.
6. Copy that user's UUID and authorize it by running this in the SQL Editor:

	```sql
	insert into public.admin_users (user_id)
	values ('YOUR_AUTH_USER_UUID');
	```

7. Visit `/admin/login` and sign in with that account.

For password recovery, allow these local redirect URLs in **Authentication → URL Configuration**: `http://localhost:5173/admin/reset-password` and `http://127.0.0.1:5173/admin/reset-password`. Add the production site's matching URL before deploying.

Row-level security limits public visitors to published posts and lets only explicitly allowlisted users manage posts. The Supabase public/anon key is intended for browser use; never put a `service_role` or secret key in a `VITE_` variable. Keep `.env.local` private and uncommitted.

If the database schema was already installed, rerun the updated `supabase/schema.sql` in the SQL Editor to provision the image bucket and upload policy.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
