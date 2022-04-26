// Original file: ../backend/pkg/proto/bogos.proto


export interface UpdateCurrentUserRequest {
  'updateDisplayName'?: (boolean);
  'displayName'?: (string);
  'updateAvatarUrl'?: (boolean);
  'avatarUrl'?: (string);
  'updatePassword'?: (boolean);
  'password'?: (string);
  '_displayName'?: "displayName";
  '_avatarUrl'?: "avatarUrl";
}

export interface UpdateCurrentUserRequest__Output {
  'updateDisplayName'?: (boolean);
  'displayName'?: (string);
  'updateAvatarUrl'?: (boolean);
  'avatarUrl'?: (string);
  'updatePassword'?: (boolean);
  'password'?: (string);
}
