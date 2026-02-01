import React, { useState } from 'react';
import styles from './CreateProjectModal.module.css';

interface CreateProjectModalProps {
    onClose: () => void;
    onSubmit: (name: string, duration: number) => void;
}

export default function CreateProjectModal({ onClose, onSubmit }: CreateProjectModalProps) {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onSubmit(name, duration);
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h2 className={styles.title}>New Trip</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Trip Name</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="e.g., Summer in Jeju"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Duration (Days)</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="number"
                                className={styles.input}
                                min={1}
                                max={30}
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                style={{ width: '80px', textAlign: 'center' }}
                            />
                            <span style={{ color: 'var(--text-sub)' }}>{duration - 1} Nights {duration} Days</span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" className={`${styles.button} ${styles.cancel}`} onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className={`${styles.button} ${styles.submit}`}>
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
