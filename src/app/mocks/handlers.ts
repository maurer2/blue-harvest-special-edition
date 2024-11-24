import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://swapi.dev/api', async () => {
    return HttpResponse.json({
      people: 'https://swapi.dev/api/people',
      planets: 'https://swapi.dev/api/planets',
      films: 'https://swapi.dev/api/films',
      species: 'https://swapi.dev/api/species',
      vehicles: 'https://swapi.dev/api/vehicles',
      starships: 'https://swapi.dev/api/starships',
    });
  }),

  // http.get('https://swapi.dev/api', () => {
  //   return new HttpResponse(null, {
  //     status: 404,
  //     statusText: 'Error',
  //   });
  // }),
];
