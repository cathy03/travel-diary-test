import React from 'react';
import { MapPin } from 'lucide-react';

export default function MapArea() {
    return (
        <div style={{
            width: '100%',
            height: '250px',
            backgroundColor: '#e6e6e6',
            backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#888',
            position: 'relative',
            borderBottom: '1px solid #ddd'
        }}>
            <MapPin size={32} color="var(--secondary-color)" style={{ marginBottom: '8px' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Map View (Mock)</span>
            <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                background: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.7rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                Naver Map Placeholder
            </div>
        </div>
    );
}
