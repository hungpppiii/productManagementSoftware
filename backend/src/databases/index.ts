import { Sequelize } from 'sequelize';
import config from 'config';

console.log('Connecting to database.');
const sequelize = new Sequelize(config.mysql_database, config.mysql_username, config.mysql_password, {
	host: config.mysql_host,
	port: config.mysql_port,
	logging: false,
	dialect: 'mysql'
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connect to database successfully.');
	})
	.catch(error => {
		console.error('Unable to connect to the database: ', error);
	});

export default sequelize;

