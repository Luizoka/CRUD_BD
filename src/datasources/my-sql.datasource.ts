import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MySql',
  connector: 'mysql',
  url: '',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'headache_tracker'
};

@lifeCycleObserver('datasource')
export class MySqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MySql';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MySql', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }

  async testConnection() {
    try {
      await this.connect();
      console.log('Connection successful');
    } catch (err) {
      console.error('Connection failed', err);
    }
  }
}
