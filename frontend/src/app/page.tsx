"use client"

import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div>
      <main>
        <h1>Welcome to SkillSync</h1>
        <p>Your personal skill management platform.</p>

        <button onClick={() => redirect("/dashboard/skills")}>
          Go to skills dashboard
        </button>
      </main>
    </div>
  );
}
