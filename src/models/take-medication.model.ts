import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    idInjection: false,
    mysql: {schema: 'headache_tracker', table: 'take_medication'}
  }
})
export class TakeMedication extends Entity {
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
    length: 200,
    generated: false,
    mysql: {columnName: 'name', dataType: 'varchar', dataLength: 200, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  name?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 50,
    generated: false,
    mysql: {columnName: 'dosage', dataType: 'varchar', dataLength: 50, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  dosage?: string;

  @property({
    type: 'date',
    jsonSchema: {nullable: true},
    generated: false,
    mysql: {columnName: 'datetime', dataType: 'datetime', dataLength: null, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  datetime?: string;

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

  constructor(data?: Partial<TakeMedication>) {
    super(data);
  }
}

export interface TakeMedicationRelations {
  // describe navigational properties here
}

export type TakeMedicationWithRelations = TakeMedication & TakeMedicationRelations;
