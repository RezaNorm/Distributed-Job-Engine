import { ConfigService } from "@nestjs/config";
import {Request} from 'express'
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.Authentication
            ]),
            secretOrKey: configService.get<string>('JWT_SECRET'),
        })
    }

    validate(payload: any) {
        return payload
    }
}