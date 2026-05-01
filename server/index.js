import express from 'express';
import cors from 'cors';
import { openDb } from './db.js';

const PORT = Number(process.env.PORT || 5174);
const app = express();
const db = openDb();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'sspsit-cms-api', time: new Date().toISOString() });
});

app.post('/api/admin/staff/promote', (req, res) => {
  const { staffId, role, year } = req.body ?? {};
  if (!staffId || !role || !year) {
    return res.status(400).json({ ok: false, error: 'staffId, role, year are required' });
  }

  const staff = db.prepare('SELECT * FROM staff WHERE id = ?').get(staffId);
  if (!staff) return res.status(404).json({ ok: false, error: `Staff not found: ${staffId}` });

  const designation = `${role} (Year ${year})`;
  db.prepare('UPDATE staff SET designation = ?, assigned_year = ? WHERE id = ?').run(
    designation,
    String(year),
    staffId
  );

  db.prepare(
    `INSERT INTO notifications (recipient_id, message, is_read)
     VALUES (?, ?, 0)`
  ).run(
    staffId,
    `Congratulations! You have been selected as the ${role} for Year ${year}. Please check your profile for new management tools.`
  );

  return res.json({
    ok: true,
    status: 'success',
    message: 'Staff promoted successfully and notification triggered.',
  });
});

app.post('/api/admin/broadcast', (req, res) => {
  const { message } = req.body ?? {};
  if (!message) return res.status(400).json({ ok: false, error: 'message is required' });

  const staffIds = db.prepare('SELECT id FROM staff').all().map((r) => r.id);
  const insert = db.prepare(
    `INSERT INTO notifications (recipient_id, message, is_read)
     VALUES (?, ?, 0)`
  );

  const tx = db.transaction((ids) => {
    for (const id of ids) insert.run(id, message);
  });
  tx(staffIds);

  return res.json({ ok: true, status: 'broadcast sent', recipients: staffIds.length });
});

app.post('/api/admin/portal/block', (req, res) => {
  const { userId, block, userType = 'staff' } = req.body ?? {};
  if (!userId || typeof block !== 'boolean') {
    return res.status(400).json({ ok: false, error: 'userId and boolean block are required' });
  }

  const table = userType === 'student' ? 'students' : 'staff';
  const status = block ? 'Blocked' : 'Active';
  const stmt = db.prepare(`UPDATE ${table} SET status = ? WHERE id = ?`);
  const info = stmt.run(status, userId);
  if (info.changes === 0) return res.status(404).json({ ok: false, error: `${userType} not found: ${userId}` });

  return res.json({ ok: true, userId, status, userType });
});

app.get('/api/notifications/:recipientId', (req, res) => {
  const { recipientId } = req.params;
  const rows = db
    .prepare(
      `SELECT id, recipient_id, message, is_read, created_at
       FROM notifications
       WHERE recipient_id = ?
       ORDER BY id DESC
       LIMIT 100`
    )
    .all(recipientId);
  res.json({ ok: true, notifications: rows });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});

