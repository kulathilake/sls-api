import { Page, PageMeta } from "../common.types";

export interface CRUDRepo<T,C,U> {
    create(create:C):Promise<T>;
    update(data: U):Promise<T>;
    findById(id: string):Promise<T>
    findPageByQuery(query: Map<string,string>, page: PageMeta<T>):Promise<Page<T>>
    remove(id:string):Promise<boolean>;
}