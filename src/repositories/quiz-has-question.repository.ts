import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MySqlDataSource} from '../datasources';
import {QuizHasQuestion, QuizHasQuestionRelations} from '../models';

export class QuizHasQuestionRepository extends DefaultCrudRepository<
  QuizHasQuestion,
  typeof QuizHasQuestion.prototype.id,
  QuizHasQuestionRelations
> {
  constructor(
    @inject('datasources.MySql') dataSource: MySqlDataSource,
  ) {
    super(QuizHasQuestion, dataSource);
  }
}
