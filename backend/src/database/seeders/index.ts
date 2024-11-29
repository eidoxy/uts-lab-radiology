import seedAdmins from './admin';

import getConnection from '..';

const seedDatabase = async () => {
  try {
    const connection = await getConnection();

    if (connection) {
      await seedAdmins();

      connection.end();
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
