import { z } from 'zod';

const starshipsSchema = z.object({
  name: z.string(),
  model: z.string(),
  manufacturer: z.string(),
  cost_in_credits: z.string(),
  length: z.string(),
  max_atmosphering_speed: z.string(),
  crew: z.string(),
  passengers: z.string(),
  cargo_capacity: z.string(),
  consumables: z.string(),
  hyperdrive_rating: z.string(),
  MGLT: z.string(),
  starship_class: z.string(),
  pilots: z.array(z.string()),
  films: z.array(z.string()),
  created: z.string(),
  edited: z.string(),
  url: z.string(),
});

export default starshipsSchema;
export type Starship = z.infer<typeof starshipsSchema>;
