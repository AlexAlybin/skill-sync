"use client";

import AddSkillForm from './AddSkillForm';
import styles from './SkillsDashboard.module.css';
import { Skill } from '@/types';
import { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { UploadSkillsForm } from './UploadSkillsForm';

const fetchSkills = async (params: {
  search?: string;
  level?: number | '';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}) => {
  const res = await axios.get('/skills', { params });
  return res.data;
};


export default function SkillsDashboard() {
  const [skills, setSkills] = useState<{ data: Skill[]; total: number }>({ data: [], total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<number | ''>('');
  const [sortBy, setSortBy] = useState<'name' | 'level'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchSkills({ search, level: levelFilter, sortBy, sortOrder, page, limit }).then(data => {
      setSkills(data);
    }).catch(err => {
      console.error("Error fetching skills:", err);
      setIsError(true);
    });
  }, [search, levelFilter, sortBy, sortOrder, page, limit]);

  // Define refetch function to reload skills
  const refetch = () => {
    setIsLoading(true);
    setIsError(false);
    fetchSkills({ search, level: levelFilter, sortBy, sortOrder, page, limit })
      .then(data => {
        setSkills(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching skills:", err);
        setIsError(true);
        setIsLoading(false);
      });
  };

  const totalPages = skills ? Math.ceil(skills.total / limit) : 1;

  return (
    <div className={styles.container}>
      {/* <div className={styles.formContainer}>
        <AddSkillForm onSkillAdded={refetch} />
      </div>

      <div className={styles.formContainer}>
        <UploadSkillsForm onSkillAdded={refetch} />
      </div> */}

      {/* {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading skills.</p>} */}

      <div >
        <div>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset page on search
            }}
            className={styles.input}
          />
          <select
            value={levelFilter}
            onChange={(e) => {
              setLevelFilter(e.target.value ? parseInt(e.target.value) : '');
              setPage(1);
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

        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading skills.</p>
        ) : (
          <table className={styles.skillTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th >Level</th>
              </tr>
            </thead>
            <tbody>
              {skills?.data.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td>{skill.level}</td>
                </tr>
              ))}
              {skills?.data.length === 0 && (
                <tr>
                  <td colSpan={2}>
                    No skills found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        <div className={styles.buttonContainer}>
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

