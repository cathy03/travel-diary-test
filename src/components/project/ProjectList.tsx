'use client';

import React, { useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import CreateProjectModal from './CreateProjectModal';
import styles from './ProjectList.module.css';
import { Plus, Trash2, Map, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProjectList() {
    const { projects, addProject, deleteProject, setCurrentProject } = useProjectStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleCreate = (name: string, duration: number) => {
        addProject(name, duration);
        setIsModalOpen(false);
    };

    const handleSelect = (id: string) => {
        setCurrentProject(id);
        router.push(`/project/${id}`);
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this trip?')) {
            deleteProject(id);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>My Trips</h1>
            </header>

            {projects.length === 0 ? (
                <div className={styles.emptyState}>
                    <Map size={48} className={styles.icon} color="var(--text-sub)" opacity={0.5} />
                    <p className={styles.emptyText}>No trips planned yet.</p>
                    <button className={styles.createButton} onClick={() => setIsModalOpen(true)}>
                        <Plus size={20} />
                        Start Planning
                    </button>
                </div>
            ) : (
                <>
                    <div className={styles.projectGrid}>
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={styles.card}
                                onClick={() => handleSelect(project.id)}
                            >
                                <div className={styles.cardInfo}>
                                    <h3>{project.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Calendar size={14} />
                                        <p>{project.duration - 1} Nights {project.duration} Days</p>
                                    </div>
                                </div>
                                <button className={styles.deleteBtn} onClick={(e) => handleDelete(e, project.id)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        className={styles.createButton}
                        onClick={() => setIsModalOpen(true)}
                        style={{ position: 'fixed', bottom: '30px', right: '50%', transform: 'translateX(50%)' }}
                    >
                        <Plus size={20} />
                        New Trip
                    </button>
                </>
            )}

            {isModalOpen && (
                <CreateProjectModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreate}
                />
            )}
        </div>
    );
}
