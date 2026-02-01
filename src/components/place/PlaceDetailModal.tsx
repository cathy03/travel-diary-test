import React, { useState, useRef } from 'react';
import { Place } from '@/types';
import { X, Camera, Trash2, Save } from 'lucide-react';

interface PlaceDetailModalProps {
    place: Place;
    onClose: () => void;
    onUpdate: (place: Place) => void;
    onDelete: (id: string) => void;
}

export default function PlaceDetailModal({ place, onClose, onUpdate, onDelete }: PlaceDetailModalProps) {
    const [name, setName] = useState(place.name);
    const [category, setCategory] = useState(place.category);
    const [cost, setCost] = useState(place.cost || 0);
    const [memo, setMemo] = useState(place.memo || '');
    const [media, setMedia] = useState<string[]>(place.media || []);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        onUpdate({
            ...place,
            name,
            category,
            cost,
            memo,
            media
        });
        onClose();
    };

    const handleDelete = () => {
        if (confirm('Delete this place?')) {
            onDelete(place.id);
            onClose();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setMedia([...media, url]);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(2px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                width: '90%', maxWidth: '400px',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                maxHeight: '90vh',
                overflowY: 'auto'
            }} onClick={e => e.stopPropagation()}>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Edit Place</h3>
                    <button onClick={onClose}><X size={24} color="#666" /></button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#666' }}>Name</label>
                        <input
                            value={name} onChange={e => setName(e.target.value)}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                        />
                    </div>

                    <div>
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

                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#666' }}>Cost (₩)</label>
                        <input
                            type="number" value={cost} onChange={e => setCost(Number(e.target.value))}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#666' }}>Memo</label>
                        <textarea
                            value={memo} onChange={e => setMemo(e.target.value)}
                            rows={3}
                            style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', resize: 'none' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', color: '#666' }}>Photos</label>
                        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                    width: '60px', height: '60px',
                                    border: '1px dashed #ccc', borderRadius: '8px',
                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                    flexShrink: 0
                                }}
                            >
                                <Camera size={20} color="#999" />
                            </button>
                            <input
                                type="file"
                                hidden
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {media.map((url, i) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    key={i}
                                    src={url}
                                    alt="preview"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                                />
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                        <button
                            onClick={handleDelete}
                            style={{
                                flex: 1, padding: '14px',
                                background: '#fff0f0', color: '#ff4d4f',
                                borderRadius: '12px', fontWeight: 600,
                                display: 'flex', justifyContent: 'center', gap: '8px'
                            }}
                        >
                            <Trash2 size={18} /> Delete
                        </button>
                        <button
                            onClick={handleSave}
                            style={{
                                flex: 2, padding: '14px',
                                background: 'var(--primary-color)', color: 'white',
                                borderRadius: '12px', fontWeight: 600,
                                display: 'flex', justifyContent: 'center', gap: '8px'
                            }}
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
