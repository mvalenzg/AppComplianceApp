import { definePreset } from '@primeuix/themes';
import Material from '@primeuix/themes/material';

export const JabilPreset = definePreset(Material, {
    semantic: {
        primary: {
            50:  '#eaf1ff', // Tone 95
            100: '#d2e4ff', // Tone 90
            200: '#a1c9ff', // Tone 80
            300: '#86aee2', // Tone 70
            400: '#6c93c5', // Tone 60
            500: '#376090', // Tone 40 (Tu azul principal #003865 aprox)
            600: '#2a5483', // Tone 35
            700: '#1b4876', // Tone 30
            800: '#093d6a', // Tone 25
            900: '#00325a'  // Tone 20
        },
        // Mapeo para errores usando tu paleta error
        error: {
            50:  '#ffedeb',
            100: '#ffdad8',
            200: '#ffb3b0',
            300: '#ff8986',
            400: '#fc575a',
            500: '#b6222e', // Rojo oficial Jabil
            600: '#93001a',
            700: '#7d0014',
            800: '#68000f',
            900: '#410006'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '#f8f9f9',  // Tone 98 Neutral
                    100: '#f0f1f1', // Tone 95
                    200: '#e1e3e3', // Tone 90
                    300: '#c5c7c7', // Tone 80
                    400: '#aaabac', // Tone 70
                    500: '#8f9191', // Tone 60
                    600: '#757778', // Tone 50
                    700: '#5c5f5f', // Tone 40
                    800: '#454747', // Tone 30
                    900: '#191c1c'  // Tone 10
                }
            }
        }
    }
});
