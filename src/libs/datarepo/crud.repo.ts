import { Page, PageMeta } from "../../common/common.types";

export interface CRUDRepo<T,C,U> {
    create(create:C):Promise<T>;
    update(data: U):Promise<T>;
    findById(id: string):Promise<T>
    findPageByQuery(query: any, page: PageMeta<T>):Promise<Page<T>>
    remove(id:string):Promise<boolean>;
}