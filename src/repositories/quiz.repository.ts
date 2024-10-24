import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Quiz, QuizRelations} from '../models';

export class QuizRepository extends DefaultCrudRepository<
  Quiz,
  typeof Quiz.prototype.id,
  QuizRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(Quiz, dataSource);
  }
}
