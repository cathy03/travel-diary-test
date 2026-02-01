'use client';

import React, { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Project, Place } from '@/types';
import MapArea from './MapArea';
import DayColumn from './DayColumn';
import PlaceCard from './PlaceCard';
import { useProjectStore } from '@/store/useProjectStore';

interface KanbanBoardProps {
    project: Project;
    onCardClick?: (place: Place) => void;
}

export default function KanbanBoard({ project, onCardClick }: KanbanBoardProps) {
    const { updatePlace } = useProjectStore();
    const [activeId, setActiveId] = useState<string | null>(null);

    const places = project.places;

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    const handleDragOver = () => {
        // Placeholder
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        const activePlaceId = active.id as string;
        const overId = over.id as string;

        const activePlace = places.find(p => p.id === activePlaceId);
        if (!activePlace) {
            setActiveId(null);
            return;
        }

        if (overId.startsWith('day-')) {
            const newDayIndex = parseInt(overId.replace('day-', ''), 10);
            if (activePlace.dayIndex !== newDayIndex) {
                updatePlace(project.id, { ...activePlace, dayIndex: newDayIndex });
            }
        } else {
            const overPlace = places.find(p => p.id === overId);
            if (overPlace) {
                if (activePlace.dayIndex !== overPlace.dayIndex) {
                    updatePlace(project.id, { ...activePlace, dayIndex: overPlace.dayIndex });
                }
            }
        }

        setActiveId(null);
    };

    const handleCardClick = (place: Place) => {
        if (onCardClick) onCardClick(place);
    };

    const activePlace = activeId ? places.find(p => p.id === activeId) : null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <MapArea />

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
            >
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        gap: '16px',
                        padding: '20px'
                    }}
                >
                    {Array.from({ length: project.duration }).map((_, index) => {
                        const dayPlaces = places.filter(p => p.dayIndex === index);
                        return (
                            <div key={index} style={{ scrollSnapAlign: 'start' }}>
                                <DayColumn
                                    dayIndex={index}
                                    places={dayPlaces}
                                    onCardClick={handleCardClick}
                                />
                            </div>
                        );
                    })}
                </div>

                <DragOverlay>
                    {activePlace ? (
                        <PlaceCard place={activePlace} onClick={() => { }} />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
}
