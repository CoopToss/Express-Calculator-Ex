const request = require('supertest');
const app = require('./app');

describe('GET /mean', () => {
  it('should return the mean of numbers', async () => {
    const res = await request(app).get('/mean?nums=1,2,3,4,5');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('operation', 'mean');
    expect(res.body).toHaveProperty('value', 3);
  });

  it('should return 400 for invalid numbers', async () => {
    const res = await request(app).get('/mean?nums=1,foo,3');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for missing nums', async () => {
    const res = await request(app).get('/mean');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /median', () => {
  it('should return the median of numbers', async () => {
    const res = await request(app).get('/median?nums=1,2,3,4,5');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('operation', 'median');
    expect(res.body).toHaveProperty('value', 3);
  });

  it('should return 400 for invalid numbers', async () => {
    const res = await request(app).get('/median?nums=1,foo,3');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for missing nums', async () => {
    const res = await request(app).get('/median');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /mode', () => {
  it('should return the mode of numbers', async () => {
    const res = await request(app).get('/mode?nums=1,2,2,3,4,4,4,5');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('operation', 'mode');
    expect(res.body).toHaveProperty('value', 4);
  });

  it('should return 400 for invalid numbers', async () => {
    const res = await request(app).get('/mode?nums=1,foo,3');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for missing nums', async () => {
    const res = await request(app).get('/mode');
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});
