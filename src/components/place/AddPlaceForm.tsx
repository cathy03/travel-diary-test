import React, { useState } from 'react';
import { Place } from '@/types';
import { X, Link as LinkIcon } from 'lucide-react';

interface AddPlaceFormProps {
    projectId: string;
    duration: number;
    onClose: () => void;
    onSubmit: (place: Omit<Place, 'id'>) => void;
}

const MOCK_PLACES = [
    { name: 'Seongsan Ilchulbong', category: 'Sightseeing', cost: 5000 },
    { name: 'Delicious Black Pork', category: 'Restaurant', cost: 50000 },
    { name: 'Sunset Cafe', category: 'Cafe', cost: 12000 },
    { name: 'Hamdeok Beach', category: 'Beach', cost: 0 },
];

export default function AddPlaceForm({ projectId, duration, onClose, onSubmit }: AddPlaceFormProps) {
    const [link, setLink] = useState('');
    const [step, setStep] = useState<'link' | 'details'>('link');

    // Form State
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Restaurant');
    const [dayIndex, setDayIndex] = useState(0);
    const [time, setTime] = useState('10:00');
    const [cost, setCost] = useState<number | ''>('');
    const [memo] = useState(''); // Keep memo state for future use if needed, but remove setter usage to silence warning

    const handleLinkSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!link) return;

        // Simulate Parsing
        setTimeout(() => {
            const randomPlace = MOCK_PLACES[Math.floor(Math.random() * MOCK_PLACES.length)];
            setName(randomPlace.name);
            setCategory(randomPlace.category);
            setCost(randomPlace.cost);
            setStep('details');
        }, 500);
    };

    const handleFinalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            category,
            dayIndex, // Note: This depends on which day column the user intended, or default to 0
            time,
            cost: Number(cost),
            memo,
            link,
            // Default / random location for mock map
            lat: 33.3 + Math.random() * 0.2,
            lng: 126.5 + Math.random() * 0.2
        });
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
            zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                width: '100%', maxWidth: '430px',
                borderTopLeftRadius: '20px', borderTopRightRadius: '20px',
                padding: '24px',
                animation: 'slideUp 0.3s ease-out',
                maxHeight: '85vh',
                overflowY: 'auto'
            }} onClick={e => e.stopPropagation()}>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Add Place</h3>
                    <button onClick={onClose}><X size={24} color="#666" /></button>
                </div>

                {step === 'link' ? (
                    <form onSubmit={handleLinkSubmit}>
                        <p style={{ marginBottom: '10px', color: '#666', fontSize: '0.9rem' }}>
                            Paste a Naver Map link to auto-fill details.
                        </p>
                        <div style={{
                            display: 'flex', alignItems: 'center',
                            border: '1px solid #ddd', borderRadius: '12px',
                            padding: '12px', marginBottom: '20px'
                        }}>
                            <LinkIcon size={20} color="#999" style={{ marginRight: '10px' }} />
                            <input
                                type="text"
                                placeholder="https://naver.me/..."
                                value={link}
                                onChange={e => setLink(e.target.value)}
                                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '1rem' }}
                                autoFocus
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                width: '100%', padding: '16px',
                                background: 'var(--primary-color)', color: 'white',
                                borderRadius: '12px', fontWeight: 600
                            }}
                        >
                            Next
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep('details')}
                            style={{
                                width: '100%', padding: '12px', marginTop: '10px',
                                background: 'transparent', color: '#888',
                                fontWeight: 500
                            }}
                        >
                            Skip (Enter Manually)
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#666' }}>Place Name</label>
                            <input
                                type="text" value={name} onChange={e => setName(e.target.value)}
                                className="input-field"
                                style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#666' }}>Category</label>
                                <select
                                    value={category} onChange={e => setCategory(e.target.value)}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', background: 'white' }}
                                >
                                    <option>Sightseeing</option>
                                    <option>Restaurant</option>
                                    <option>Cafe</option>
                                    <option>Accommodation</option>
                                    <option>Activity</option>
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#666' }}>Day</label>
                                <select
                                    value={dayIndex} onChange={e => setDayIndex(parseInt(e.target.value))}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', background: 'white' }}
                                >
                                    {Array.from({ length: duration }).map((_, i) => (
                                        <option key={i} value={i}>Day {i + 1}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#666' }}>Time</label>
                                <input
                                    type="time" value={time} onChange={e => setTime(e.target.value)}
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#666' }}>Cost (₩)</label>
                                <input
                                    type="number" value={cost} onChange={e => setCost(Number(e.target.value))}
                                    placeholder="0"
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%', padding: '16px', marginTop: '10px',
                                background: 'var(--primary-color)', color: 'white',
                                borderRadius: '12px', fontWeight: 600
                            }}
                        >
                            Add Place
                        </button>
                    </form>
                )}
            </div>
            <style jsx global>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
