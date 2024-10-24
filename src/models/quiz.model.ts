import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'headache_tracker', table: 'quiz'}}
})
export class Quiz extends Entity {
  @property({
    type: 'number',
    jsonSchema: {nullable: false},
    precision: 10,
    scale: 0,
    generated: 1,
    id: 1,
    mysql: {columnName: 'id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: 1},
  })
  id?: number;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 100,
    generated: false,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  name?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 250,
    generated: false,
    mysql: {columnName: 'description', dataType: 'varchar', dataLength: 250, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  description?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Quiz>) {
    super(data);
  }
}

export interface QuizRelations {
  // describe navigational properties here
}

export type QuizWithRelations = Quiz & QuizRelations;
