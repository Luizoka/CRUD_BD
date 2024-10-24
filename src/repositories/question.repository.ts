import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {Question, QuestionRelations} from '../models';

export class QuestionRepository extends DefaultCrudRepository<
  Question,
  typeof Question.prototype.id,
  QuestionRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(Question, dataSource);
  }
}
