import request from 'supertest';
import app from '../src/app';

describe('Books API', () => {
  it('GET /api/v1/books should return all books', async () => {
    const res = await request(app).get('/api/v1/books');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/v1/books should create a new book', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .send({ title: 'New Book', author: 'John Doe' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('New Book');
  });

  it('GET /api/v1/books/:id should return 404 for invalid ID', async () => {
    const res = await request(app).get('/api/v1/books/unknown');
    expect(res.status).toBe(404);
  });
});
