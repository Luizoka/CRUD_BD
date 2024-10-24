import {Entity, model, property} from '@loopback/repository';

@model({settings: {idInjection: false, mysql: {schema: 'sys', table: 'user_summary'}}})
export class UserSummary extends Entity {
  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 32,
    generated: false,
    mysql: {columnName: 'user', dataType: 'varchar', dataLength: 32, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  user?: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 64,
    scale: 0,
    generated: false,
    mysql: {columnName: 'statements', dataType: 'decimal', dataLength: null, dataPrecision: 64, dataScale: 0, nullable: 'Y', generated: false},
  })
  statements?: number;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 11,
    generated: false,
    mysql: {columnName: 'statement_latency', dataType: 'varchar', dataLength: 11, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  statementLatency?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 11,
    generated: false,
    mysql: {columnName: 'statement_avg_latency', dataType: 'varchar', dataLength: 11, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  statementAvgLatency?: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 65,
    scale: 0,
    generated: false,
    mysql: {columnName: 'table_scans', dataType: 'decimal', dataLength: null, dataPrecision: 65, dataScale: 0, nullable: 'Y', generated: false},
  })
  tableScans?: number;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 64,
    scale: 0,
    generated: false,
    mysql: {columnName: 'file_ios', dataType: 'decimal', dataLength: null, dataPrecision: 64, dataScale: 0, nullable: 'Y', generated: false},
  })
  fileIos?: number;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 11,
    generated: false,
    mysql: {columnName: 'file_io_latency', dataType: 'varchar', dataLength: 11, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  fileIoLatency?: string;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 41,
    scale: 0,
    generated: false,
    mysql: {columnName: 'current_connections', dataType: 'decimal', dataLength: null, dataPrecision: 41, dataScale: 0, nullable: 'Y', generated: false},
  })
  currentConnections?: number;

  @property({
    type: 'number',
    jsonSchema: {nullable: true},
    precision: 41,
    scale: 0,
    generated: false,
    mysql: {columnName: 'total_connections', dataType: 'decimal', dataLength: null, dataPrecision: 41, dataScale: 0, nullable: 'Y', generated: false},
  })
  totalConnections?: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {nullable: false},
    precision: 19,
    scale: 0,
    generated: false,
    mysql: {columnName: 'unique_hosts', dataType: 'bigint', dataLength: null, dataPrecision: 19, dataScale: 0, nullable: 'N', generated: false},
  })
  uniqueHosts: number;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 11,
    generated: false,
    mysql: {columnName: 'current_memory', dataType: 'varchar', dataLength: 11, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  currentMemory?: string;

  @property({
    type: 'string',
    jsonSchema: {nullable: true},
    length: 11,
    generated: false,
    mysql: {columnName: 'total_memory_allocated', dataType: 'varchar', dataLength: 11, dataPrecision: null, dataScale: null, nullable: 'Y', generated: false},
  })
  totalMemoryAllocated?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserSummary>) {
    super(data);
  }
}

export interface UserSummaryRelations {
  // describe navigational properties here
}

export type UserSummaryWithRelations = UserSummary & UserSummaryRelations;
