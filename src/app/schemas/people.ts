import { z } from 'zod';

const peopleSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      height: z.string(),
      mass: z.string(),
      hair_color: z.string(),
      skin_color: z.string(),
      eye_color: z.string(),
      birth_year: z.string(),
      gender: z.string(),
      homeworld: z.string(),
      films: z.array(z.string()),
      species: z.array(z.string()),
      vehicles: z.array(z.string()),
      starships: z.array(z.string()),
      created: z.string(),
      edited: z.string(),
      url: z.string(),
    }),
  ),
});

export default peopleSchema;
export type People = z.infer<typeof peopleSchema>;
