import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const ROOT = path.resolve(process.cwd());
const DATA_DIR = path.join(ROOT, 'server', 'data');
const DB_PATH = path.join(DATA_DIR, 'app.sqlite');
const SCHEMA_PATH = path.join(ROOT, 'server', 'schema.sql');

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

export function openDb() {
  ensureDir(DATA_DIR);
  const db = new Database(DB_PATH);
  db.pragma('foreign_keys = ON');

  const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
  db.exec(schema);
  seedIfEmpty(db);

  return db;
}

function seedIfEmpty(db) {
  const staffCount = db.prepare('SELECT COUNT(*) AS c FROM staff').get().c;
  if (staffCount > 0) return;

  const insertStaff = db.prepare(
    `INSERT INTO staff (id, name, email, password, position, designation, assigned_year, photo_url, status)
     VALUES (@id, @name, @email, @password, @position, @designation, @assigned_year, @photo_url, @status)`
  );

  insertStaff.run({
    id: 'FAC-CS-042',
    name: 'Dr. Priya Singh',
    email: 'priya.singh@sspsit.edu.in',
    password: 'demo',
    position: 'Associate Professor',
    designation: 'Class Teacher (Year 3)',
    assigned_year: '3',
    photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    status: 'Active',
  });

  insertStaff.run({
    id: 'FAC-IT-011',
    name: 'Prof. Rahul Patil',
    email: 'rahul.patil@sspsit.edu.in',
    password: 'demo',
    position: 'Assistant Professor',
    designation: null,
    assigned_year: null,
    photo_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    status: 'Active',
  });
}

