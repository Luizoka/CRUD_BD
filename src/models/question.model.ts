import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'headache_tracker', table: 'question'}}
})
export class Question extends Entity {
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
    length: 250,
    generated: false,
    mysql: {columnName: 'question', dataType: 'varchar', dataLength: 250, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  question?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 100,
    generated: false,
    mysql: {columnName: 'type', dataType: 'varchar', dataLength: 100, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  type?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 45,
    generated: false,
    mysql: {columnName: 'layout', dataType: 'varchar', dataLength: 45, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  layout?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 500,
    generated: false,
    mysql: {columnName: 'description_to_show', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  descriptionToShow?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Question>) {
    super(data);
  }
}

export interface QuestionRelations {
  // describe navigational properties here
}

export type QuestionWithRelations = Question & QuestionRelations;
