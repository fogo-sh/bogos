// Original file: ../backend/pkg/proto/bogos.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

export interface User {
  'id'?: (number);
  'username'?: (string);
  'displayName'?: (string);
  'avatarUrl'?: (string);
  'createdAt'?: (_google_protobuf_Timestamp | null);
  'updatedAt'?: (_google_protobuf_Timestamp | null);
  '_displayName'?: "displayName";
  '_avatarUrl'?: "avatarUrl";
  '_updatedAt'?: "updatedAt";
}

export interface User__Output {
  'id'?: (number);
  'username'?: (string);
  'displayName'?: (string);
  'avatarUrl'?: (string);
  'createdAt'?: (_google_protobuf_Timestamp__Output);
  'updatedAt'?: (_google_protobuf_Timestamp__Output);
}
