import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {idInjection: false, mysql: {schema: 'headache_tracker', table: 'details'}}
})
export class Details extends Entity {
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
    required: true,
    jsonSchema: {nullable: false},
    length: 500,
    generated: false,
    mysql: {columnName: 'detail', dataType: 'varchar', dataLength: 500, dataPrecision: null, dataScale: null, nullable: 'N', generated: false},
  })
  detail: string;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {nullable: false},
    precision: 10,
    scale: 0,
    generated: false,
    mysql: {columnName: 'take_id', dataType: 'int', dataLength: null, dataPrecision: 10, dataScale: 0, nullable: 'N', generated: false},
  })
  takeId: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Details>) {
    super(data);
  }
}

export interface DetailsRelations {
  // describe navigational properties here
}

export type DetailsWithRelations = Details & DetailsRelations;
