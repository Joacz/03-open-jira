
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Pendiente Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat.',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description:
        'En Progreso Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        'Terminada Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat.',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },]
};
