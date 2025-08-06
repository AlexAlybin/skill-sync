"use client";

import AddSkillForm from './AddSkillForm';
import styles from './SkillsDashboard.module.css';
import { Skill } from '@/types';
import { useState, useEffect, use } from 'react';
import axios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { UploadSkillsForm } from './UploadSkillsForm';

const PAGE_LIMIT = 10;

type QueryParams = {
  search: string;
  level: number | '';
  sortBy: 'name' | 'level';
  sortOrder: 'asc' | 'desc';
  page: number;
};

const fetchSkills = async (params: QueryParams & {
  limit?: number;
}) => {
  const res = await axios.get('/skills', { params });
  return res.data;
};


export default function SkillsDashboard() {
  const [query, setQuery] = useState<QueryParams>({
    search: '',
    level: '',
    sortBy: 'name',
    sortOrder: 'asc',
    page: 1,
  });

  const { error, data, refetch } = useQuery<{ data: Skill[]; total: number }>({
    queryKey: ['skillsData'],
    queryFn: () => fetchSkills({ ...query, limit: PAGE_LIMIT })
  });

  useEffect(() => {
    refetch();
  }, [query]);

  if (error) return <div>An error occurred: {error.message}</div>;

  const totalPages = data ? Math.ceil(data.total / PAGE_LIMIT) : 1;

  return (
    <div className={styles.container}>
      {/* <div className={styles.formContainer}>
        <AddSkillForm onSkillAdded={refetch} />
      </div>

      <div className={styles.formContainer}>
        <UploadSkillsForm onSkillAdded={refetch} />
      </div> */}

      <div >
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={query.search}
            onChange={(e) => {
              setQuery({ ...query, search: e.target.value, page: 1 });
            }}
            className={styles.input}
          />
          <select
            value={query.level}
            onChange={(e) => {
              setQuery({ ...query, level: e.target.value ? parseInt(e.target.value) : '', page: 1 });
            }}
          >
            <option value="">All Levels</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Level {i + 1}
              </option>
            ))}
          </select>
        </div>

        <table className={styles.skillTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th >Level</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((skill: Skill) => (
              <tr key={skill.id}>
                <td>{skill.name}</td>
                <td>{skill.level}</td>
              </tr>
            ))}
            {data?.data.length === 0 && (
              <tr>
                <td colSpan={2}>
                  No skills found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className={styles.buttonContainer}>
          <button
            disabled={query.page === 1}
            onClick={() => setQuery({ ...query, page: query.page - 1 })}
          >
            Previous
          </button>
          <span>
            Page {query.page} of {totalPages}
          </span>
          <button
            disabled={query.page === totalPages}
            onClick={() => setQuery({ ...query, page: query.page + 1 })}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

