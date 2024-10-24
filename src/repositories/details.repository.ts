import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Details, DetailsRelations} from '../models';

export class DetailsRepository extends DefaultCrudRepository<
  Details,
  typeof Details.prototype.id,
  DetailsRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(Details, dataSource);
  }
}
