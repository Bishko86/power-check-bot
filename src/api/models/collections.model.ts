import { Collection } from 'mongodb';
import { CollectionsModel } from '../../enums';

export type CollectionModelData = Record<CollectionsModel, Collection>;
