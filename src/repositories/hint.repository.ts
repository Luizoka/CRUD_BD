import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Hint, HintRelations} from '../models';

export class HintRepository extends DefaultCrudRepository<
  Hint,
  typeof Hint.prototype.id,
  HintRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(Hint, dataSource);
  }
}
