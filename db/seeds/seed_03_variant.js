exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('variants').del();
  await knex('variants').insert([
    {
      label: 'warna',
      value: 'Merah',
    },
    {
      label: 'warna',
      value: 'Kuning',
    },
    {
      label: 'warna',
      value: 'Hijau',
    },
    {
      label: 'warna',
      value: 'Biru',
    },
    {
      label: 'warna',
      value: 'Coklat',
    },
    {
      label: 'warna',
      value: 'Ungu',
    },
    {
      label: 'warna',
      value: 'Orange',
    },
    {
      label: 'warna',
      value: 'Hitam',
    },
    {
      label: 'warna',
      value: 'Abu Misty',
    },
    {
      label: 'warna',
      value: 'Pink',
    },
    {
      label: 'ukuran',
      value: 'S',
    },
    {
      label: 'ukuran',
      value: 'M',
    },
    {
      label: 'ukuran',
      value: 'L',
    },
    {
      label: 'ukuran',
      value: 'XL',
    },
    {
      label: 'ukuran',
      value: 'XXL',
    },
  ]);
};
