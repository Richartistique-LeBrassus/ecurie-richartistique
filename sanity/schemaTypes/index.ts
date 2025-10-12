import { type SchemaTypeDefinition } from 'sanity';

import {blockContentType} from './blockContentType';
import {productType} from './productType';
import { categoryType } from './categoryType';
import { subcategoryType } from './subcategoryType';
import { orderType } from './orderType';


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, productType, categoryType, subcategoryType, orderType],
};