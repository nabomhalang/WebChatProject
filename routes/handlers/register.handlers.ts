

import { number, object, string } from 'yup';
import crypto from 'crypto';
import HandlersClass from '../interfaces/handlers.interface.js';
import { Request, Response } from 'express';


export default new HandlersClass({
    post: async (req: Request, res: Response) => {
        const mysql = req.mysql;

        try {
            const { email, user, pass, disp, sex } = req.body;
            // console.log(email, user, pass, disp, sex)

            var _r: string[] | string = await mysql.query("SELECT * FROM USER WHERE userEmail=? OR userID=?", [email, user])
            if (_r.length) {
                return res.status(403).json({
                    c: 403,
                    d: "Forbidden",
                    m: "동일한 사용자 이름 또는 이메일로 가입 된 계정이 있습니다."
                });
            }
            const hashUUID = crypto.createHash("sha256")
                .update(`${email}/${user}/${new Date().toISOString()}`)
                .digest("hex");

            const hashPassword = crypto.createHash("sha256")
                .update(`${pass}/genshin`)
                .digest("hex");

            await mysql.query("INSERT INTO USER (UUID, userEmail, userID, userPW, userName, userSEX) VALUES (?, ?, ?, ?,?,?)", [hashUUID, email, user, hashPassword, disp, sex])

            return res.status(200).json({
                c: 200,
                d: null,
                m: "회원가입에 성공하였습니다."
            });
        } catch (e) {
            throw e;
        }

    },
    path: '/register',
    scheme: object({
        email: string().email().max(256).required(),
        user: string().max(64).required(),
        pass: string().min(8).required(),
        disp: string().max(32).required(),
        sex: number().required()
    })
})