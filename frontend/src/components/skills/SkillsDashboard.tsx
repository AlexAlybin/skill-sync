'use client';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios'; // pre-authenticated axios instance
import { Skill } from '@/types';

export default function SkillsDashboard() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/skills')
      .then((res) => {
        setSkills(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading skills...</p>;

  return (
    <div className="space-y-4">
      {skills.map(skill => (
        <div key={skill.id} className="border p-3 rounded shadow">
          <p><strong>{skill.name}</strong> — Level {skill.level}</p>
        </div>
      ))}
    </div>
  );
}
