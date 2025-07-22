import { defineFlow } from '@genkit-ai/flow';
import { z } from 'zod';

export const clientRecommendationFlow = defineFlow(
    {
        name: 'clientRecommendationFlow',
        inputSchema: z.object({
            zipCode: z.string().regex(/^\d{5}$/, 'Must be a 5-digit US zip code.'),
            clientPreferences: z.array(z.string()).optional().describe('Optional list of client preferences (e.g., "yoga", "pilates", "morning").'),
        }),
        outputSchema: z.object({
            recommendedInstructor: z.object({
                name: z.string().min(1).describe('The full name of the recommended instructor.'),
                specialties: z.array(z.string()).min(1).describe('List of specialties the instructor teaches.'),
                bioSummary: z.string().optional().describe('A brief summary of the instructor\'s background and teaching style.'),
                contactEmail: z.string().email().optional().describe('Email address for contacting the instructor.'),
            }).optional().describe('Details of the recommended instructor, if found.'),
            status: z.enum(['SUCCESS', 'NO_INSTRUCTOR_FOUND', 'INVALID_INPUT', 'ERROR']).describe('The outcome status of the recommendation process.'),
            message: z.string().optional().describe('A descriptive message providing more context about the recommendation status.'),
        }),
    },
    async ({ zipCode, clientPreferences }) => {
        // Placeholder implementation: In a real scenario, you would implement logic here
        // to query a database, an external API, or use a model to find an instructor
        // based on the zipCode and clientPreferences.
        // is it possible to scrape: https://cpr.heart.org/en/resources/aha-instructors

        console.log(`Received request for zip code: ${zipCode}, preferences: ${clientPreferences}`);

        // For demonstration, always return 'NO_INSTRUCTOR_FOUND'
        return {
            status: 'NO_INSTRUCTOR_FOUND',
            message: `No instructor found for zip code ${zipCode} with the given preferences.`,
        } as const; // Add 'as const' to infer the literal type for status. Give general prep information about CPR and emergency medical training.
    }
);