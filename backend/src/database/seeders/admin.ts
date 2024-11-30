import { ResultSetHeader } from 'mysql2';
import { hash } from 'bcrypt';

import { AdminQueryResult } from '../../models/admin.model';
import getConnection from '..';

const data = {
  nama_admin: 'admin',
  email: 'admin@gmail.com',
  password: 'admin',
  telepon: '123457890',
};

export default async function seedAdmins() {
  try {
    const connection = await getConnection();

    if (connection) {
      const [rows] = await connection.query<AdminQueryResult[]>(
        'SELECT * FROM admin WHERE email = ?',
        [data.email]
      );

      // ? : check if there is no admin with the email
      if (rows.length === 0) {
        const hashedPasswod = await hash(data.password, 10);

        await connection.query<ResultSetHeader>(
          'INSERT INTO admins (name, email, password, phone) VALUES (?, ?, ?, ?)',
          [data.nama_admin, data.email, hashedPasswod, data.telepon]
        );

        console.log(`Admin with email ${data.email} seeded!`);
      } else {
        console.log(`Admin with email ${data.email} already exists!`);
      }

      connection.end();
    }
  } catch (error) {
    console.error('Error seeding admins:', error);
  }
}
