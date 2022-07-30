// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.19.4
// source: pkg/proto/bogos.proto

package proto

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// UsersClient is the client API for Users service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type UsersClient interface {
	GetJwt(ctx context.Context, in *GetJwtRequest, opts ...grpc.CallOption) (*GetJwtReply, error)
	GetCurrentUser(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*User, error)
	UpdateCurrentUser(ctx context.Context, in *UpdateCurrentUserRequest, opts ...grpc.CallOption) (*User, error)
}

type usersClient struct {
	cc grpc.ClientConnInterface
}

func NewUsersClient(cc grpc.ClientConnInterface) UsersClient {
	return &usersClient{cc}
}

func (c *usersClient) GetJwt(ctx context.Context, in *GetJwtRequest, opts ...grpc.CallOption) (*GetJwtReply, error) {
	out := new(GetJwtReply)
	err := c.cc.Invoke(ctx, "/bogos.Users/GetJwt", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersClient) GetCurrentUser(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*User, error) {
	out := new(User)
	err := c.cc.Invoke(ctx, "/bogos.Users/GetCurrentUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *usersClient) UpdateCurrentUser(ctx context.Context, in *UpdateCurrentUserRequest, opts ...grpc.CallOption) (*User, error) {
	out := new(User)
	err := c.cc.Invoke(ctx, "/bogos.Users/UpdateCurrentUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// UsersServer is the server API for Users service.
// All implementations must embed UnimplementedUsersServer
// for forward compatibility
type UsersServer interface {
	GetJwt(context.Context, *GetJwtRequest) (*GetJwtReply, error)
	GetCurrentUser(context.Context, *emptypb.Empty) (*User, error)
	UpdateCurrentUser(context.Context, *UpdateCurrentUserRequest) (*User, error)
	mustEmbedUnimplementedUsersServer()
}

// UnimplementedUsersServer must be embedded to have forward compatible implementations.
type UnimplementedUsersServer struct {
}

func (UnimplementedUsersServer) GetJwt(context.Context, *GetJwtRequest) (*GetJwtReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetJwt not implemented")
}
func (UnimplementedUsersServer) GetCurrentUser(context.Context, *emptypb.Empty) (*User, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetCurrentUser not implemented")
}
func (UnimplementedUsersServer) UpdateCurrentUser(context.Context, *UpdateCurrentUserRequest) (*User, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateCurrentUser not implemented")
}
func (UnimplementedUsersServer) mustEmbedUnimplementedUsersServer() {}

// UnsafeUsersServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to UsersServer will
// result in compilation errors.
type UnsafeUsersServer interface {
	mustEmbedUnimplementedUsersServer()
}

func RegisterUsersServer(s grpc.ServiceRegistrar, srv UsersServer) {
	s.RegisterService(&Users_ServiceDesc, srv)
}

func _Users_GetJwt_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetJwtRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServer).GetJwt(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Users/GetJwt",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServer).GetJwt(ctx, req.(*GetJwtRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Users_GetCurrentUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(emptypb.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServer).GetCurrentUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Users/GetCurrentUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServer).GetCurrentUser(ctx, req.(*emptypb.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _Users_UpdateCurrentUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdateCurrentUserRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(UsersServer).UpdateCurrentUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Users/UpdateCurrentUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(UsersServer).UpdateCurrentUser(ctx, req.(*UpdateCurrentUserRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Users_ServiceDesc is the grpc.ServiceDesc for Users service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Users_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "bogos.Users",
	HandlerType: (*UsersServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetJwt",
			Handler:    _Users_GetJwt_Handler,
		},
		{
			MethodName: "GetCurrentUser",
			Handler:    _Users_GetCurrentUser_Handler,
		},
		{
			MethodName: "UpdateCurrentUser",
			Handler:    _Users_UpdateCurrentUser_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "pkg/proto/bogos.proto",
}

// OutingsClient is the client API for Outings service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type OutingsClient interface {
	ListOutings(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*ListOutingsReply, error)
	ListOutingUsers(ctx context.Context, in *ListOutingUsersRequest, opts ...grpc.CallOption) (*ListOutingUsersReply, error)
	GetOuting(ctx context.Context, in *GetOutingRequest, opts ...grpc.CallOption) (*Outing, error)
	ListUserOutings(ctx context.Context, in *ListUserOutingsRequest, opts ...grpc.CallOption) (*ListUserOutingsReply, error)
	CreateOuting(ctx context.Context, in *CreateOutingRequest, opts ...grpc.CallOption) (*Outing, error)
	UpdateOuting(ctx context.Context, in *UpdateOutingRequest, opts ...grpc.CallOption) (*Outing, error)
	AddUser(ctx context.Context, in *OutingAddUserRequest, opts ...grpc.CallOption) (*emptypb.Empty, error)
	RemoveUser(ctx context.Context, in *OutingRemoveUserRequest, opts ...grpc.CallOption) (*emptypb.Empty, error)
}

type outingsClient struct {
	cc grpc.ClientConnInterface
}

func NewOutingsClient(cc grpc.ClientConnInterface) OutingsClient {
	return &outingsClient{cc}
}

func (c *outingsClient) ListOutings(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*ListOutingsReply, error) {
	out := new(ListOutingsReply)
	err := c.cc.Invoke(ctx, "/bogos.Outings/ListOutings", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *outingsClient) ListOutingUsers(ctx context.Context, in *ListOutingUsersRequest, opts ...grpc.CallOption) (*ListOutingUsersReply, error) {
	out := new(ListOutingUsersReply)
	err := c.cc.Invoke(ctx, "/bogos.Outings/ListOutingUsers", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *outingsClient) GetOuting(ctx context.Context, in *GetOutingRequest, opts ...grpc.CallOption) (*Outing, error) {
	out := new(Outing)
	err := c.cc.Invoke(ctx, "/bogos.Outings/GetOuting", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *outingsClient) ListUserOutings(ctx context.Context, in *ListUserOutingsRequest, opts ...grpc.CallOption) (*ListUserOutingsReply, error) {
	out := new(ListUserOutingsReply)
	err := c.cc.Invoke(ctx, "/bogos.Outings/ListUserOutings", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *outingsClient) CreateOuting(ctx context.Context, in *CreateOutingRequest, opts ...grpc.CallOption) (*Outing, error) {
	out := new(Outing)
	err := c.cc.Invoke(ctx, "/bogos.Outings/CreateOuting", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *outingsClient) UpdateOuting(ctx context.Context, in *UpdateOutingRequest, opts ...grpc.CallOption) (*Outing, error) {
	out := new(Outing)
	err := c.cc.Invoke(ctx, "/bogos.Outings/UpdateOuting", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *outingsClient) AddUser(ctx context.Context, in *OutingAddUserRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/bogos.Outings/AddUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *outingsClient) RemoveUser(ctx context.Context, in *OutingRemoveUserRequest, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/bogos.Outings/RemoveUser", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// OutingsServer is the server API for Outings service.
// All implementations must embed UnimplementedOutingsServer
// for forward compatibility
type OutingsServer interface {
	ListOutings(context.Context, *emptypb.Empty) (*ListOutingsReply, error)
	ListOutingUsers(context.Context, *ListOutingUsersRequest) (*ListOutingUsersReply, error)
	GetOuting(context.Context, *GetOutingRequest) (*Outing, error)
	ListUserOutings(context.Context, *ListUserOutingsRequest) (*ListUserOutingsReply, error)
	CreateOuting(context.Context, *CreateOutingRequest) (*Outing, error)
	UpdateOuting(context.Context, *UpdateOutingRequest) (*Outing, error)
	AddUser(context.Context, *OutingAddUserRequest) (*emptypb.Empty, error)
	RemoveUser(context.Context, *OutingRemoveUserRequest) (*emptypb.Empty, error)
	mustEmbedUnimplementedOutingsServer()
}

// UnimplementedOutingsServer must be embedded to have forward compatible implementations.
type UnimplementedOutingsServer struct {
}

func (UnimplementedOutingsServer) ListOutings(context.Context, *emptypb.Empty) (*ListOutingsReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListOutings not implemented")
}
func (UnimplementedOutingsServer) ListOutingUsers(context.Context, *ListOutingUsersRequest) (*ListOutingUsersReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListOutingUsers not implemented")
}
func (UnimplementedOutingsServer) GetOuting(context.Context, *GetOutingRequest) (*Outing, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetOuting not implemented")
}
func (UnimplementedOutingsServer) ListUserOutings(context.Context, *ListUserOutingsRequest) (*ListUserOutingsReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListUserOutings not implemented")
}
func (UnimplementedOutingsServer) CreateOuting(context.Context, *CreateOutingRequest) (*Outing, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateOuting not implemented")
}
func (UnimplementedOutingsServer) UpdateOuting(context.Context, *UpdateOutingRequest) (*Outing, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateOuting not implemented")
}
func (UnimplementedOutingsServer) AddUser(context.Context, *OutingAddUserRequest) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method AddUser not implemented")
}
func (UnimplementedOutingsServer) RemoveUser(context.Context, *OutingRemoveUserRequest) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RemoveUser not implemented")
}
func (UnimplementedOutingsServer) mustEmbedUnimplementedOutingsServer() {}

// UnsafeOutingsServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to OutingsServer will
// result in compilation errors.
type UnsafeOutingsServer interface {
	mustEmbedUnimplementedOutingsServer()
}

func RegisterOutingsServer(s grpc.ServiceRegistrar, srv OutingsServer) {
	s.RegisterService(&Outings_ServiceDesc, srv)
}

func _Outings_ListOutings_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(emptypb.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OutingsServer).ListOutings(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Outings/ListOutings",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OutingsServer).ListOutings(ctx, req.(*emptypb.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _Outings_ListOutingUsers_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListOutingUsersRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OutingsServer).ListOutingUsers(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Outings/ListOutingUsers",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OutingsServer).ListOutingUsers(ctx, req.(*ListOutingUsersRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Outings_GetOuting_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetOutingRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OutingsServer).GetOuting(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Outings/GetOuting",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OutingsServer).GetOuting(ctx, req.(*GetOutingRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Outings_ListUserOutings_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListUserOutingsRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OutingsServer).ListUserOutings(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Outings/ListUserOutings",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OutingsServer).ListUserOutings(ctx, req.(*ListUserOutingsRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Outings_CreateOuting_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateOutingRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OutingsServer).CreateOuting(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Outings/CreateOuting",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OutingsServer).CreateOuting(ctx, req.(*CreateOutingRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Outings_UpdateOuting_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdateOutingRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OutingsServer).UpdateOuting(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Outings/UpdateOuting",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OutingsServer).UpdateOuting(ctx, req.(*UpdateOutingRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Outings_AddUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(OutingAddUserRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OutingsServer).AddUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Outings/AddUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OutingsServer).AddUser(ctx, req.(*OutingAddUserRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Outings_RemoveUser_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(OutingRemoveUserRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OutingsServer).RemoveUser(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Outings/RemoveUser",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OutingsServer).RemoveUser(ctx, req.(*OutingRemoveUserRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Outings_ServiceDesc is the grpc.ServiceDesc for Outings service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Outings_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "bogos.Outings",
	HandlerType: (*OutingsServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "ListOutings",
			Handler:    _Outings_ListOutings_Handler,
		},
		{
			MethodName: "ListOutingUsers",
			Handler:    _Outings_ListOutingUsers_Handler,
		},
		{
			MethodName: "GetOuting",
			Handler:    _Outings_GetOuting_Handler,
		},
		{
			MethodName: "ListUserOutings",
			Handler:    _Outings_ListUserOutings_Handler,
		},
		{
			MethodName: "CreateOuting",
			Handler:    _Outings_CreateOuting_Handler,
		},
		{
			MethodName: "UpdateOuting",
			Handler:    _Outings_UpdateOuting_Handler,
		},
		{
			MethodName: "AddUser",
			Handler:    _Outings_AddUser_Handler,
		},
		{
			MethodName: "RemoveUser",
			Handler:    _Outings_RemoveUser_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "pkg/proto/bogos.proto",
}

// PhotosClient is the client API for Photos service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type PhotosClient interface {
	ListOutingPhotos(ctx context.Context, in *ListOutingPhotosRequest, opts ...grpc.CallOption) (*ListOutingPhotosReply, error)
	UploadPhoto(ctx context.Context, in *UploadPhotoRequest, opts ...grpc.CallOption) (*UploadPhotoReply, error)
}

type photosClient struct {
	cc grpc.ClientConnInterface
}

func NewPhotosClient(cc grpc.ClientConnInterface) PhotosClient {
	return &photosClient{cc}
}

func (c *photosClient) ListOutingPhotos(ctx context.Context, in *ListOutingPhotosRequest, opts ...grpc.CallOption) (*ListOutingPhotosReply, error) {
	out := new(ListOutingPhotosReply)
	err := c.cc.Invoke(ctx, "/bogos.Photos/ListOutingPhotos", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *photosClient) UploadPhoto(ctx context.Context, in *UploadPhotoRequest, opts ...grpc.CallOption) (*UploadPhotoReply, error) {
	out := new(UploadPhotoReply)
	err := c.cc.Invoke(ctx, "/bogos.Photos/UploadPhoto", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// PhotosServer is the server API for Photos service.
// All implementations must embed UnimplementedPhotosServer
// for forward compatibility
type PhotosServer interface {
	ListOutingPhotos(context.Context, *ListOutingPhotosRequest) (*ListOutingPhotosReply, error)
	UploadPhoto(context.Context, *UploadPhotoRequest) (*UploadPhotoReply, error)
	mustEmbedUnimplementedPhotosServer()
}

// UnimplementedPhotosServer must be embedded to have forward compatible implementations.
type UnimplementedPhotosServer struct {
}

func (UnimplementedPhotosServer) ListOutingPhotos(context.Context, *ListOutingPhotosRequest) (*ListOutingPhotosReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListOutingPhotos not implemented")
}
func (UnimplementedPhotosServer) UploadPhoto(context.Context, *UploadPhotoRequest) (*UploadPhotoReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UploadPhoto not implemented")
}
func (UnimplementedPhotosServer) mustEmbedUnimplementedPhotosServer() {}

// UnsafePhotosServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to PhotosServer will
// result in compilation errors.
type UnsafePhotosServer interface {
	mustEmbedUnimplementedPhotosServer()
}

func RegisterPhotosServer(s grpc.ServiceRegistrar, srv PhotosServer) {
	s.RegisterService(&Photos_ServiceDesc, srv)
}

func _Photos_ListOutingPhotos_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListOutingPhotosRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PhotosServer).ListOutingPhotos(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Photos/ListOutingPhotos",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PhotosServer).ListOutingPhotos(ctx, req.(*ListOutingPhotosRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Photos_UploadPhoto_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UploadPhotoRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(PhotosServer).UploadPhoto(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/bogos.Photos/UploadPhoto",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(PhotosServer).UploadPhoto(ctx, req.(*UploadPhotoRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Photos_ServiceDesc is the grpc.ServiceDesc for Photos service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Photos_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "bogos.Photos",
	HandlerType: (*PhotosServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "ListOutingPhotos",
			Handler:    _Photos_ListOutingPhotos_Handler,
		},
		{
			MethodName: "UploadPhoto",
			Handler:    _Photos_UploadPhoto_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "pkg/proto/bogos.proto",
}
