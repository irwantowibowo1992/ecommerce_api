/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('brands').del();
  await knex('brands').insert([
    {
      id: 'cb19f23c-f3af-4cd6-a829-2a3680d650e4',
      name: 'Lilo',
    },
    {
      id: 'ff83def7-ff16-4010-995b-e54e2e6b272c',
      name: 'Milia',
    },
    {
      id: '32904468-fd64-440e-8418-78d0e2c99622',
      name: 'Nesi',
    },
    {
      id: '08a6deb2-c00a-49d5-9790-c2de64a8f53a',
      name: 'Owan',
    },
    {
      id: 'fcbc1da0-b041-468c-bfb7-f4d7d17abd7a',
      name: 'Tio',
    },
  ]);
};
