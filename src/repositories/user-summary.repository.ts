import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {UserSummary, UserSummaryRelations} from '../models';

export class UserSummaryRepository extends DefaultCrudRepository<
  UserSummary,
  typeof UserSummary.prototype.id,
  UserSummaryRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(UserSummary, dataSource);
  }
}
