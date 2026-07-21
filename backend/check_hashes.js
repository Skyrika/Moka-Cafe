import bcrypt from 'bcrypt';

const hashes = [
  '$2b$12$JzM9YW6tN5xkE.83IZq30OI8TzF3Qc4VX1OAI1H.axY5UeI7XRssy',
  '$2b$12$x4HnB9OyJ7YUQ.jQ1r2v9eF3oLzO8ZkYtZVY0HgVIZ7rnzV/nIXX1e'
];

const tests = ['admin', 'user', '123', 'password', 'user123', 'admin123'];

(async () => {
  for (const t of tests) {
    for (const h of hashes) {
      const ok = await bcrypt.compare(t, h);
      if (ok) {
        console.log(`${t} matches ${h}`);
      }
    }
  }
})();
