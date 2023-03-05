

import HandlersClass from "../interfaces/handlers.interface.js";
import { object, string } from "yup";
import { Response, Request } from "express";
import crypto from 'crypto';

interface UserInfo {
    UUID: string,
    userEmail: string,
    userID: string,
    userPW: string,
    userName: string,
    userAvatar: any,
    userBD: any,
    userSEX: number,
    userVerified: number
}

export default new HandlersClass({
    post: async (req: Request, res: Response) => {
        const mysql = req.mysql;

        const Unauthorized = () => {
            return res.status(401).json({
                c: 401,
                d: "Unauthorized",
                e: "사용자 이름, 이메일 또는 비밀번호가 잘못되었습니다."
            });
        }

        const { user, pass } = req.body;

        var _r: string[] | string = await mysql.query("SELECT * FROM USER WHERE userEmail=? OR userID=?", [user, user])
        if (!_r.length) return Unauthorized();

        const userInfo: UserInfo = _r[0] as unknown as UserInfo;

        const hashPassword = crypto.createHash("sha256")
            .update(`${pass}/genshin`)
            .digest("hex")

        if (userInfo.userPW != hashPassword) return Unauthorized();

        return res.status(200).json({
            c: 200,
            d: "Login Success"
        });
    },
    path: "/login",
    scheme: object({
        user: string().required(),
        pass: string().required(),
    })
})