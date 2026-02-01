'use client';

import React, { useState } from 'react';
import { useProjectStore } from '@/store/useProjectStore';
import KanbanBoard from '@/components/project/KanbanBoard';
import AddPlaceForm from '@/components/place/AddPlaceForm';
import PlaceDetailModal from '@/components/place/PlaceDetailModal';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Place } from '@/types';

export default function ProjectPage() {
    const params = useParams();
    const router = useRouter();
    const { projects, addPlace, updatePlace, deletePlace } = useProjectStore();
    const [isAdding, setIsAdding] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

    // Derive project directly from store state
    // Even though 'projects' is an external mutable source, zustand hooks trigger re-render on change.
    // params.id is stable or changes on navigation.
    const project = projects.find(p => p.id === params.id);

    const handleAddPlace = (place: Omit<Place, 'id'>) => {
        if (project) {
            addPlace(project.id, place);
        }
    };

    const handleUpdatePlace = (place: Place) => {
        if (project) {
            updatePlace(project.id, place);
            setSelectedPlace(null);
        }
    };

    const handleDeletePlace = (placeId: string) => {
        if (project) {
            deletePlace(project.id, placeId);
            setSelectedPlace(null);
        }
    };

    if (!project) {
        return <div style={{ padding: '20px' }}>Loading project...</div>;
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header overlay for back button */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 10,
                background: 'rgba(255,255,255,0.8)',
                borderRadius: '50%',
                padding: '8px',
                cursor: 'pointer',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }} onClick={() => router.push('/')}>
                <ArrowLeft size={20} color="#333" />
            </div>

            <KanbanBoard
                project={project}
                onCardClick={(place) => setSelectedPlace(place)}
            />

            {/* FAB */}
            {!selectedPlace && !isAdding && (
                <div style={{
                    position: 'absolute',
                    bottom: '30px',
                    right: '25px',
                    zIndex: 50
                }}>
                    <button
                        onClick={() => setIsAdding(true)}
                        style={{
                            width: '60px', height: '60px', borderRadius: '50%',
                            background: 'var(--secondary-color)', color: 'white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                            fontSize: '32px'
                        }}
                    >
                        <span style={{ lineHeight: 1, marginTop: '-4px' }}>+</span>
                    </button>
                </div>
            )}

            {isAdding && (
                <AddPlaceForm
                    projectId={project.id}
                    duration={project.duration}
                    onClose={() => setIsAdding(false)}
                    onSubmit={handleAddPlace}
                />
            )}

            {selectedPlace && (
                <PlaceDetailModal
                    place={selectedPlace}
                    onClose={() => setSelectedPlace(null)}
                    onUpdate={handleUpdatePlace}
                    onDelete={handleDeletePlace}
                />
            )}
        </div>
    );
}
