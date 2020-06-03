export default {
  jwtSecret: '@QEGTUI',
};

export const ports = {
  port: process.env.NODE_ENV === 'production' ? 8080 : 3001,
};
