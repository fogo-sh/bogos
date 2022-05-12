// Original file: ../backend/pkg/proto/bogos.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

export interface UpdateOutingRequest {
  'outingId'?: (number);
  'updateTitle'?: (boolean);
  'title'?: (string);
  'updateDate'?: (boolean);
  'date'?: (_google_protobuf_Timestamp | null);
}

export interface UpdateOutingRequest__Output {
  'outingId'?: (number);
  'updateTitle'?: (boolean);
  'title'?: (string);
  'updateDate'?: (boolean);
  'date'?: (_google_protobuf_Timestamp__Output);
}
