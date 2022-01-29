import { Request } from "express";

export interface Err extends Error {
    status ?: number
}

export interface Req extends Request {
    userId ?: number
}

export interface Token {
	email: string
	userId: number
	iat: number
}