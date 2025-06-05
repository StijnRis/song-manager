# Song Manager

A web application to manage and organize your song files and music sheets.

---

## Features

-   Secure login with password protection
-   Browse, view, and manage song files
-   Organize music sheets by song title
-   Database-backed for reliability
-   Modern, responsive UI

---

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (LTS recommended)
-   [pnpm](https://pnpm.io/installation#using-npm)

### Installation

1. **Install pnpm** (if not already):
    ```sh
    npm install -g pnpm@latest-10
    ```
2. **Install dependencies:**
    ```sh
    pnpm install
    ```
3. **Set up the database:**
    ```sh
    pnpm exec prisma generate
    pnpm exec prisma db push
    ```
4. **Configure environment variables:**
   Create a `.env` file in the project root with the following:
    ```env
    SITE_PASSWORD=your_password_here
    SONG_DIR=absolute/path/to/your/song/folder
    ```
    - `SITE_PASSWORD`: Password required to access the site
    - `SONG_DIR`: Path to the folder containing your song directories (example in /public/songs can be used)
5. **Start the development server:**
    ```sh
    pnpm run dev
    ```
6. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## Song Directory Structure

-   The folder specified by `SONG_DIR` should contain subfolders, each named after a song.
-   Each song folder can contain one or more files (e.g., PDF music sheets).
-   You can find an example at /public/songs

**Example:**

```
SONG_DIR/
  ├── Song Title 1/
  │     ├── sheet1.pdf
  │     └── sheet2.pdf
  └── Song Title 2/
        └── music.pdf
```

---

## Contributing

### Database Changes

-   After updating the Prisma schema, run:
    ```sh
    pnpm exec prisma generate
    pnpm exec prisma db push
    ```

### View Database Records

-   To open Prisma Studio in your browser:
    ```sh
    pnpm exec prisma studio
    ```

---

## License

MIT
