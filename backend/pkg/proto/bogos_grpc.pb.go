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
	GetCurrentUser(ctx context.Context, in *GetCurrentUserRequest, opts ...grpc.CallOption) (*User, error)
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

func (c *usersClient) GetCurrentUser(ctx context.Context, in *GetCurrentUserRequest, opts ...grpc.CallOption) (*User, error) {
	out := new(User)
	err := c.cc.Invoke(ctx, "/bogos.Users/GetCurrentUser", in, out, opts...)
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
	GetCurrentUser(context.Context, *GetCurrentUserRequest) (*User, error)
	mustEmbedUnimplementedUsersServer()
}

// UnimplementedUsersServer must be embedded to have forward compatible implementations.
type UnimplementedUsersServer struct {
}

func (UnimplementedUsersServer) GetJwt(context.Context, *GetJwtRequest) (*GetJwtReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetJwt not implemented")
}
func (UnimplementedUsersServer) GetCurrentUser(context.Context, *GetCurrentUserRequest) (*User, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetCurrentUser not implemented")
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
	in := new(GetCurrentUserRequest)
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
		return srv.(UsersServer).GetCurrentUser(ctx, req.(*GetCurrentUserRequest))
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
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "pkg/proto/bogos.proto",
}
