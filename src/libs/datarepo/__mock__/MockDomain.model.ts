/**
 * Mock db mapped domain object
 */

import { table, attribute } from "@aws/dynamodb-data-mapper-annotations";
import 'reflect-metadata';

@table('mock_table')
export class MockDomainModel {
    @attribute()
    name?: string
}
