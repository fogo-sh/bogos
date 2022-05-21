// Original file: ../backend/pkg/proto/bogos.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

export interface Photo {
  'id'?: (number);
  'url'?: (string);
  'title'?: (string);
  'createdAt'?: (_google_protobuf_Timestamp | null);
  'updatedAt'?: (_google_protobuf_Timestamp | null);
  '_title'?: "title";
  '_updatedAt'?: "updatedAt";
}

export interface Photo__Output {
  'id'?: (number);
  'url'?: (string);
  'title'?: (string);
  'createdAt'?: (_google_protobuf_Timestamp__Output);
  'updatedAt'?: (_google_protobuf_Timestamp__Output);
}
