import {
  ObjectLiteral,
  DataSource,
  EntityManager,
  QueryRunner,
  DeepPartial,
  SaveOptions,
  RemoveOptions,
  InsertResult,
  ObjectId,
  FindOptionsWhere,
  UpdateResult,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  EntitySchema,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseRepository<Entity extends ObjectLiteral> {
  readonly manager: EntityManager;
  readonly queryRunner: QueryRunner;
  readonly entitySchema: EntitySchema<Entity>;

  constructor(dataSource: DataSource, entity: EntitySchema<Entity>) {
    this.queryRunner = dataSource.createQueryRunner();
    this.manager = this.queryRunner.manager;
    this.entitySchema = entity;
  }

  hasId(entity: Entity): boolean {
    return this.manager.hasId(entity);
  }

  getId(entity: Entity): any {
    return this.manager.getId(entity);
  }

  create(): Entity;

  create(entityLikeArray: DeepPartial<Entity>[]): Entity[];

  create(entityLike: DeepPartial<Entity>): Entity;

  create(
    plainEntityLikeOrPlainEntityLikes?:
      | DeepPartial<Entity>
      | DeepPartial<Entity>[],
  ): Entity | Entity[] {
    return this.manager.create(
      this.entitySchema as any,
      plainEntityLikeOrPlainEntityLikes as any,
    );
  }

  merge(
    mergeIntoEntity: Entity,
    ...entityLikes: DeepPartial<Entity>[]
  ): Entity {
    return this.manager.merge(
      this.entitySchema as any,
      mergeIntoEntity,
      ...entityLikes,
    );
  }

  preload(entityLike: DeepPartial<Entity>): Promise<Entity | undefined> {
    return this.manager.preload(this.entitySchema as any, entityLike);
  }

  save<T extends DeepPartial<Entity>>(
    entities: T[],
    options: SaveOptions & { reload: false },
  ): Promise<T[]>;

  save<T extends DeepPartial<Entity>>(
    entities: T[],
    options?: SaveOptions,
  ): Promise<(T & Entity)[]>;

  save<T extends DeepPartial<Entity>>(
    entity: T,
    options: SaveOptions & { reload: false },
  ): Promise<T>;

  save<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T & Entity>;

  save<T extends DeepPartial<Entity>>(
    entityOrEntities: T | T[],
    options?: SaveOptions,
  ): Promise<T | T[]> {
    return this.manager.save(
        this.entitySchema as any,
        entityOrEntities as any,
        options,
    ) as Promise<T | T[]>;
  }

  remove(entities: Entity[], options?: RemoveOptions): Promise<Entity[]>;

  remove(entity: Entity, options?: RemoveOptions): Promise<Entity>;

  remove(
    entityOrEntities: Entity | Entity[],
    options?: RemoveOptions,
  ): Promise<Entity | Entity[]> {
    return this.manager.remove(
      this.entitySchema as any,
      entityOrEntities as any,
      options,
    );
  }

  softRemove<T extends DeepPartial<Entity>>(
    entities: T[],
    options: SaveOptions & { reload: false },
  ): Promise<T[]>;

  softRemove<T extends DeepPartial<Entity>>(
    entities: T[],
    options?: SaveOptions,
  ): Promise<(T & Entity)[]>;

  softRemove<T extends DeepPartial<Entity>>(
    entity: T,
    options: SaveOptions & { reload: false },
  ): Promise<T>;

  softRemove<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T & Entity>;

  softRemove<T extends DeepPartial<Entity>>(
    entityOrEntities: T | T[],
    options?: SaveOptions,
  ): Promise<T | T[]> {
    return this.manager.softRemove(
      this.entitySchema as any,
      entityOrEntities as any,
      options,
    );
  }

  recover<T extends DeepPartial<Entity>>(
    entities: T[],
    options: SaveOptions & { reload: false },
  ): Promise<T[]>;

  recover<T extends DeepPartial<Entity>>(
    entities: T[],
    options?: SaveOptions,
  ): Promise<(T & Entity)[]>;

  recover<T extends DeepPartial<Entity>>(
    entity: T,
    options: SaveOptions & { reload: false },
  ): Promise<T>;

  recover<T extends DeepPartial<Entity>>(
    entity: T,
    options?: SaveOptions,
  ): Promise<T & Entity>;

  recover<T extends DeepPartial<Entity>>(
    entityOrEntities: T | T[],
    options?: SaveOptions,
  ): Promise<T | T[]> {
    return this.manager.recover(
      this.entitySchema as any,
      entityOrEntities as any,
      options,
    );
  }

  insert(
    entity: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[],
  ): Promise<InsertResult> {
    return this.manager.insert(this.entitySchema as any, entity);
  }

  update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
    partialEntity: QueryDeepPartialEntity<Entity>,
  ): Promise<UpdateResult> {
    return this.manager.update(
      this.entitySchema as any,
      criteria as any,
      partialEntity,
    );
  }

  delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
  ): Promise<DeleteResult> {
    return this.manager.delete(this.entitySchema as any, criteria as any);
  }

  softDelete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
  ): Promise<UpdateResult> {
    return this.manager.softDelete(this.entitySchema as any, criteria as any);
  }

  restore(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
  ): Promise<UpdateResult> {
    return this.manager.restore(this.entitySchema as any, criteria as any);
  }

  count(options?: FindManyOptions<Entity>): Promise<number>;

  count(conditions?: FindOptionsWhere<Entity>): Promise<number>;

  count(
    optionsOrConditions?: FindManyOptions<Entity> | FindOptionsWhere<Entity>,
  ): Promise<number> {
    return this.manager.count(
      this.entitySchema as any,
      optionsOrConditions as any,
    );
  }

  find(options?: FindManyOptions<Entity>): Promise<Entity[]>;

  find(conditions?: FindOptionsWhere<Entity>): Promise<Entity[]>;

  find(
    optionsOrConditions?: FindManyOptions<Entity> | FindOptionsWhere<Entity>,
  ): Promise<Entity[]> {
    return this.manager.find(
      this.entitySchema as any,
      optionsOrConditions as any,
    );
  }

  findAndCount(options?: FindManyOptions<Entity>): Promise<[Entity[], number]>;

  findAndCount(
    conditions?: FindOptionsWhere<Entity>,
  ): Promise<[Entity[], number]>;

  findAndCount(
    optionsOrConditions?: FindManyOptions<Entity> | FindOptionsWhere<Entity>,
  ): Promise<[Entity[], number]> {
    return this.manager.findAndCount(
      this.entitySchema as any,
      optionsOrConditions as any,
    );
  }

  // findByIds está deprecated en 0.3+, usar findBy en su lugar
  findByIds(ids: any[], optionsOrConditions?: FindManyOptions<Entity> | FindOptionsWhere<Entity>,): Promise<Entity[]> {
    return this.manager.findBy(this.entitySchema as any, {
      id: ids,
    } as any);
  }

  findOne(
    id?: string | number | Date | ObjectId,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined>;

  findOne(options?: FindOneOptions<Entity>): Promise<Entity | undefined>;

  findOne(
    conditions?: FindOptionsWhere<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined>;

    findOne(
    optionsOrConditions?:
        | string
        | number
        | Date
        | ObjectId
        | FindOneOptions<Entity>
        | FindOptionsWhere<Entity>,
    maybeOptions?: FindOneOptions<Entity>,
    ): Promise<Entity | undefined | null> {
    return this.manager.findOne(this.entitySchema, {
        where: optionsOrConditions as FindOptionsWhere<Entity>,
        });
    }

  findOneOrFail(
    id?: string | number | Date | ObjectId,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;

  findOneOrFail(options?: FindOneOptions<Entity>): Promise<Entity>;

  findOneOrFail(
    conditions?: FindOptionsWhere<Entity>,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity>;

  findOneOrFail(
    optionsOrConditions?:
      | string
      | number
      | Date
      | ObjectId
      | FindOneOptions<Entity>
      | FindOptionsWhere<Entity>,
    maybeOptions?: FindOneOptions<Entity>,
  ): Promise<Entity> {
    return this.manager.findOneOrFail(
      this.entitySchema as any,
      optionsOrConditions as any
    );
  }

  query(query: string, parameters?: any[]): Promise<any> {
    return this.manager.query(query, parameters);
  }

  clear(): Promise<void> {
    return this.manager.clear(this.entitySchema);
  }

  increment(
    conditions: FindOptionsWhere<Entity>,
    propertyPath: string,
    value: number | string,
  ): Promise<UpdateResult> {
    return this.manager.increment(
      this.entitySchema,
      conditions,
      propertyPath,
      value,
    );
  }

  decrement(
    conditions: FindOptionsWhere<Entity>,
    propertyPath: string,
    value: number | string,
  ): Promise<UpdateResult> {
    return this.manager.decrement(
      this.entitySchema,
      conditions,
      propertyPath,
      value,
    );
  }

  async transaction<T>(operation: () => Promise<T>): Promise<T> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const result = await operation();

      await this.queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await this.queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await this.queryRunner.release();
    }
  }
}
