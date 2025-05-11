# Password Protection for Song Manager

This site is now password protected using a simple middleware and login page.

## How it works

-   All routes except `/login` and static assets are protected.
-   On first visit, users are redirected to `/login` and must enter the password.
-   On successful login, a cookie is set to keep the user authenticated.
-   The password is checked against the `SITE_PASSWORD` environment variable.

## Setup

1. Add a `.env.local` file in the project root with:

```
SITE_PASSWORD=yourpasswordhere
```

2. Restart the dev server after setting the environment variable.

## Customization

-   To change the password, update `SITE_PASSWORD` in `.env.local`.
-   To log out, clear the `site-auth` cookie in your browser.

---

This is a simple protection mechanism and not suitable for production use. For production, consider a more robust authentication solution.
