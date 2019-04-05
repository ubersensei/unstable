const dbConfig = {
    // host: process.env.RDS_HOSTNAME || 'localhost',
    // host: process.env.RDS_HOSTNAME || '192.168.86.98',
    // host: process.env.RDS_HOSTNAME || '127.0.0.1',
    // host: process.env.RDS_HOSTNAME || 'some-mariadb',
    // host: 'mymariadb',    
    // host: process.env.RDS_HOSTNAME || '127.0.0.1',
    // user: process.env.RDS_USERNAME || 'root',
    // password: process.env.RDS_PASSWORD || 'tangent90',
    // database: process.env.RDS_DATABASE || 'slingshot_db',
    // port: 3306
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    // database: process.env.RDS_DATABASE,
    port: process.env.RDS_PORT
};

module.exports.dbConfig = dbConfig;
