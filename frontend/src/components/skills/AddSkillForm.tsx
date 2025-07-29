'use client';

import { useState } from 'react';
import axios from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddSkillForm({ onSkillAdded }: { onSkillAdded: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [level, setLevel] = useState(1);

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            return axios.post('/skills', { name, level });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] });
            onSkillAdded();
            setIsOpen(false);
            setName('');
            setLevel(1);
        },
        onError: (err) => {
            console.error('Failed to add skill:', err);
        },
    });

    return (
        <>
            <button
                onClick={() => setIsOpen(prev => !prev)}
            >
                Add Skill
            </button>

            {isOpen && (
                <div >
                    <div >
                        <h2 >Add New Skill</h2>
                        <input
                            type="text"
                            placeholder="Skill name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="number"
                            min={1}
                            max={5}
                            value={level}
                            onChange={(e) => setLevel(Number(e.target.value))}
                        />
                        <div>
                            <button
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => mutation.mutate()}
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
