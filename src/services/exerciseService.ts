
// MET (Metabolic Equivalent of Task) values for common exercises
// MET values are approximate calories burned per kg of body weight per hour
export const exercises = [
  { id: 1, name: 'Walking (slow)', met: 2.5 },
  { id: 2, name: 'Walking (moderate)', met: 3.5 },
  { id: 3, name: 'Walking (fast)', met: 5.0 },
  { id: 4, name: 'Running (5 mph)', met: 8.3 },
  { id: 5, name: 'Running (7.5 mph)', met: 12.3 },
  { id: 6, name: 'Running (10 mph)', met: 16.0 },
  { id: 7, name: 'Cycling (leisure)', met: 4.0 },
  { id: 8, name: 'Cycling (moderate)', met: 8.0 },
  { id: 9, name: 'Cycling (vigorous)', met: 12.0 },
  { id: 10, name: 'Swimming (leisure)', met: 6.0 },
  { id: 11, name: 'Swimming (vigorous)', met: 10.0 },
  { id: 12, name: 'Weightlifting (light)', met: 3.0 },
  { id: 13, name: 'Weightlifting (moderate)', met: 5.0 },
  { id: 14, name: 'Weightlifting (vigorous)', met: 6.0 },
  { id: 15, name: 'Yoga', met: 2.5 },
  { id: 16, name: 'Pilates', met: 3.0 },
  { id: 17, name: 'Dancing', met: 4.5 },
  { id: 18, name: 'Aerobics', met: 7.0 },
  { id: 19, name: 'Basketball', met: 6.5 },
  { id: 20, name: 'Soccer', met: 7.0 },
  { id: 21, name: 'Tennis', met: 7.0 },
  { id: 22, name: 'Hiking', met: 6.0 },
  { id: 23, name: 'Gardening', met: 3.8 },
  { id: 24, name: 'Cleaning (house)', met: 3.0 },
  { id: 25, name: 'Stair climbing', met: 4.0 },
];

/**
 * Calculate calories burned during exercise
 * @param metValue - MET value of the exercise
 * @param weightKg - Weight in kilograms
 * @param durationMinutes - Duration in minutes
 * @returns Calories burned
 */
export const calculateCaloriesBurned = (
  metValue: number,
  weightKg: number,
  durationMinutes: number
): number => {
  // Formula: MET * weight (kg) * duration (hours)
  const durationHours = durationMinutes / 60;
  return metValue * weightKg * durationHours;
};

/**
 * Get exercise by ID
 * @param id - Exercise ID
 * @returns Exercise object or undefined if not found
 */
export const getExerciseById = (id: number) => {
  return exercises.find(exercise => exercise.id === id);
};

/**
 * Search exercises by name
 * @param query - Search query
 * @returns Array of matching exercises
 */
export const searchExercises = (query: string) => {
  if (!query) return exercises;
  
  const lowercaseQuery = query.toLowerCase();
  return exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(lowercaseQuery)
  );
};
