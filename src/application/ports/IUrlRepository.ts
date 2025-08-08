import { Injectable } from '@nestjs/common';



import { IRepository } from './IRepository';
import { Url } from "src/domain/models/Url";

@Injectable()
export abstract class IUrlRepository extends IRepository<Url> {
    abstract findUrlByValue(value: string): Promise<Url | undefined>;
    abstract findUrlBySlug(slug: string): Promise<Url | undefined>;
}