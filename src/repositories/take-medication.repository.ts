import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {TakeMedication, TakeMedicationRelations} from '../models';

export class TakeMedicationRepository extends DefaultCrudRepository<
  TakeMedication,
  typeof TakeMedication.prototype.id,
  TakeMedicationRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(TakeMedication, dataSource);
  }
}
