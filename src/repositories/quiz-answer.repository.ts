import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {QuizAnswer, QuizAnswerRelations} from '../models';

export class QuizAnswerRepository extends DefaultCrudRepository<
  QuizAnswer,
  typeof QuizAnswer.prototype.id,
  QuizAnswerRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(QuizAnswer, dataSource);
  }
}
