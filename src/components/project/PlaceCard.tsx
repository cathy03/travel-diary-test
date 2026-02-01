import React from 'react';
import { Place } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Clock } from 'lucide-react';

interface PlaceCardProps {
    place: Place;
    onClick: () => void;
}

export default function PlaceCard({ place, onClick }: PlaceCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: place.id, data: { ...place } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                background: 'white',
                borderRadius: '12px',
                padding: '12px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                border: '1px solid transparent',
                position: 'relative'
            }}
            onClick={onClick}
        >
            <div
                {...attributes}
                {...listeners}
                style={{ cursor: 'grab', color: '#ccc', display: 'flex', alignItems: 'center' }}
                onClick={(e) => e.stopPropagation()} // Prevent card click when dragging
            >
                <GripVertical size={18} />
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>{place.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-sub)', background: '#f5f5f5', padding: '2px 6px', borderRadius: '4px' }}>
                        {place.category}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-sub)' }}>
                    {place.time && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={12} />
                            <span>{place.time}</span>
                        </div>
                    )}
                    {place.cost && (
                        <div style={{ fontWeight: 600, color: 'var(--primary-color)' }}>
                            ₩{place.cost.toLocaleString()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
