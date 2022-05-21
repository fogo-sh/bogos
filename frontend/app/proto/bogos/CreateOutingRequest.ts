// Original file: ../backend/pkg/proto/bogos.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

export interface CreateOutingRequest {
  'title'?: (string);
  'date'?: (_google_protobuf_Timestamp | null);
}

export interface CreateOutingRequest__Output {
  'title'?: (string);
  'date'?: (_google_protobuf_Timestamp__Output);
}
