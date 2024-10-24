import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'headache_tracker', table: 'hint'}}
})
export class Hint extends Entity {
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
    length: 500,
    generated: false,
    mysql: {columnName: 'text', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  text?: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {nullable: false},
    precision: 10,
    scale: 0,
    generated: false,
    mysql: {columnName: 'question_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: false},
  })
  questionId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Hint>) {
    super(data);
  }
}

export interface HintRelations {
  // describe navigational properties here
}

export type HintWithRelations = Hint & HintRelations;
