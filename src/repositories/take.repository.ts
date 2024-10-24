import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Take, TakeRelations} from '../models';

export class TakeRepository extends DefaultCrudRepository<
  Take,
  typeof Take.prototype.id,
  TakeRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(Take, dataSource);
  }
}
