// Original file: ../backend/pkg/proto/bogos.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

export interface Outing {
  'id'?: (number);
  'title'?: (string);
  'date'?: (_google_protobuf_Timestamp | null);
  'createdAt'?: (_google_protobuf_Timestamp | null);
  'updatedAt'?: (_google_protobuf_Timestamp | null);
  '_updatedAt'?: "updatedAt";
}

export interface Outing__Output {
  'id'?: (number);
  'title'?: (string);
  'date'?: (_google_protobuf_Timestamp__Output);
  'createdAt'?: (_google_protobuf_Timestamp__Output);
  'updatedAt'?: (_google_protobuf_Timestamp__Output);
}
