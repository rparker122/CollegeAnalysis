
# College Admissions Analysis Dashboard

**Live Demo:** [https://rparker-collegeanalysis.vercel.app](https://rparker-collegeanalysis.vercel.app)

A full‑stack, interactive data analysis platform that visualizes key college admissions metrics—like acceptance rate, application volume, tuition, SAT distributions, and regional demographics. Built with **React + TypeScript**, styled with **CSS**, and powered by **Supabase**. Deployed seamlessly on **Vercel**.

---

##  Features

- **College Comparison UI** – Select multiple colleges to compare data side‑by‑side.
- **Acceptance Rate Visualization** – View and analyze acceptance rates per institution.
- **Tuition vs. SAT Scatter Plot** – Explore the correlation between tuition and average SAT scores.
- **SAT Score Distribution Charts** – Visual distributions of SAT score ranges.
- **Demographic Insights by Region** – Breakdowns of admissions data by geographic region.
- **Interactive & Responsive** – Dynamic charts that respond to user selections, optimized for all devices.

---

##  Technology Stack

| Layer             | Technology               |
|------------------|---------------------------|
| Frontend          | React + TypeScript        |
| Styling           | CSS                       |
| Backend / Database | Supabase (Auth + PostgreSQL) |
| Hosting           | Vercel                    |

---

##  Project Structure

```text
.
├── public/
├── src/
│   ├── components/     # Reusable chart and UI components
│   ├── pages/          # Page components including main dashboard
│   ├── supabase/       # Supabase client configuration
│   ├── styles/         # CSS files
│   ├── App.tsx
│   └── main.tsx
├── .env.local
├── tsconfig.json
├── package.json
└── README.md
````

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rparker122/college-admissions-dashboard.git
cd college-admissions-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file with your Supabase configuration:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Launch the Development Server

```bash
npm run dev
# or
yarn dev
```

Open your browser at `http://localhost:3000` to explore the dashboard.

---

## Supabase Setup Guide

1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Create a `colleges` table with fields like:

   * `id` (UUID, primary key)
   * `name` (text)
   * `acceptance_rate` (decimal)
   * `total_applications` (integer)
   * `tuition` (integer)
   * `avg_sat_score` (integer)
   * `region` (text or enum)
3. Optionally, add a separate `sat_scores` table if you’re modeling score distributions.
4. Enable **Row Level Security** and configure policies to ensure data is accessible only as intended.

---

## Screenshots & Visual Demos

*(Add screenshots here in a future iteration to showcase the UI and charts—e.g., college selector, tuition vs SAT chart, demographic breakdowns, etc.)*

---

## Deploying on Vercel

The app is hosted via **Vercel**. To redeploy:

```bash
vercel deploy
```

Ensure that your Supabase URL and anon key are also set as environment variables in your Vercel project settings.

---

## Contributing

We welcome contributions to enhance visualizations, add new metrics, or improve usability:

1. Fork the repository.
2. Create a branch:

   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your improvements:

   ```bash
   git commit -m "Add [feature]"
   ```
4. Push your branch:

   ```bash
   git push origin feature/YourFeature
   ```
5. Open a Pull Request for review.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## About the Author

**Robert Parker**
GitHub: [@rparker122](https://github.com/rparker122)
College Analysis Dashboard: [Live Demo](https://rparker-collegeanalysis.vercel.app)

---



