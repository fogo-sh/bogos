// Original file: ../backend/pkg/proto/bogos.proto

import type { Photo as _bogos_Photo, Photo__Output as _bogos_Photo__Output } from '../bogos/Photo';

export interface UploadPhotoReply {
  'uploadUrl'?: (string);
  'photo'?: (_bogos_Photo | null);
}

export interface UploadPhotoReply__Output {
  'uploadUrl'?: (string);
  'photo'?: (_bogos_Photo__Output);
}
