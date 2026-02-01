import { create } from 'zustand';
import { Project, Place } from '@/types';

interface ProjectStore {
    projects: Project[];
    currentProjectId: string | null;

    // Actions
    addProject: (name: string, duration: number) => void;
    setCurrentProject: (id: string) => void;
    deleteProject: (id: string) => void;

    // Place Actions within the current project
    addPlace: (projectId: string, place: Omit<Place, 'id'>) => void;
    updatePlace: (projectId: string, place: Place) => void;
    deletePlace: (projectId: string, placeId: string) => void;
    movePlace: (projectId: string, activeId: string, overId: string) => void; // Logic for sorting
}

// Helper to mock a UUID if uuid package not available, but I should use a simple random string for now to avoid installing uuid if not needed, but uuid is good. 
// I didn't install uuid. I will use Math.random for now or install uuid. 
// I'll stick to Math.random().toString(36) for simplicity in this prototype.

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useProjectStore = create<ProjectStore>((set) => ({
    projects: [],
    currentProjectId: null,

    addProject: (name, duration) => set((state) => {
        const newProject: Project = {
            id: generateId(),
            name,
            duration,
            places: [],
        };
        return { projects: [...state.projects, newProject] };
    }),

    setCurrentProject: (id) => set({ currentProjectId: id }),

    deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        currentProjectId: state.currentProjectId === id ? null : state.currentProjectId,
    })),

    addPlace: (projectId, place) => set((state) => {
        return {
            projects: state.projects.map((p) => {
                if (p.id !== projectId) return p;
                const newPlace = { ...place, id: generateId() };
                return { ...p, places: [...p.places, newPlace] };
            })
        };
    }),

    updatePlace: (projectId, place) => set((state) => ({
        projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            return {
                ...p,
                places: p.places.map((pl) => pl.id === place.id ? place : pl)
            };
        })
    })),

    deletePlace: (projectId, placeId) => set((state) => ({
        projects: state.projects.map((p) => {
            if (p.id !== projectId) return p;
            return { ...p, places: p.places.filter((pl) => pl.id !== placeId) };
        })
    })),

    movePlace: (_projectId, _activeId, _overId) => set((state) => {
        // This is a placeholder for the reordering logic.
        // The actual complex DND logic usually happens in the component or via a more complex reducer.
        // For now we will leave it simple or implement arrayMove here if needed.
        return state;
    }),
}));
