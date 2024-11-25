import { z } from 'zod';

const speciesSchema = z.object({
  name: z.string(),
  classification: z.string(),
  designation: z.string(),
  average_height: z.string(),
  skin_colors: z.string(),
  hair_colors: z.string(),
  eye_colors: z.string(),
  average_lifespan: z.string(),
  homeworld: z.string().nullable(),
  language: z.string(),
  people: z.array(z.string()),
  films: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export default speciesSchema;
export type SpeciesSchema = z.infer<typeof speciesSchema>;
