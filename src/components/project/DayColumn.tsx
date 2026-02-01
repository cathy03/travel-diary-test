import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import PlaceCard from './PlaceCard';
import { Place } from '@/types';

interface DayColumnProps {
    dayIndex: number;
    places: Place[];
    onCardClick: (place: Place) => void;
}

export default function DayColumn({ dayIndex, places, onCardClick }: DayColumnProps) {
    const { setNodeRef } = useDroppable({
        id: `day-${dayIndex}`,
    });

    return (
        <div
            style={{
                flex: '0 0 85%', // Show mostly one day but peek at the next
                maxWidth: '320px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                maxHeight: 'calc(100vh - 300px)', // Adjust based on Map height
            }}
        >
            <div style={{
                padding: '10px 16px',
                fontWeight: 700,
                color: 'var(--primary-color)',
                borderBottom: '1px solid #eee',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span>Day {dayIndex + 1}</span>
                <span style={{ fontSize: '0.8rem', color: '#999', fontWeight: 400 }}>{places.length} places</span>
            </div>

            <div
                ref={setNodeRef}
                style={{
                    flex: 1,
                    padding: '0 16px',
                    overflowY: 'auto',
                    minHeight: '100px' // Ensure drop area exists even if empty
                }}
            >
                <SortableContext
                    id={`day-${dayIndex}`}
                    items={places.map(p => p.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {places.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '40px 0',
                            color: '#ccc',
                            fontSize: '0.9rem',
                            border: '2px dashed #eee',
                            borderRadius: '12px',
                            marginTop: '10px'
                        }}>
                            No places yet
                        </div>
                    ) : (
                        places.map((place) => (
                            <PlaceCard
                                key={place.id}
                                place={place}
                                onClick={() => onCardClick(place)}
                            />
                        ))
                    )}
                </SortableContext>
            </div>
        </div>
    );
}
