// import { CourseController } from '../controllers/CourseController';
import { CourseService } from './CourseService';
// import { Request, Response } from 'express';
// import { Client } from 'pg';
import Knex from 'knex'
const knexConfig = require("../knexfile");
const knex = Knex(knexConfig["test"]);


describe('CourseService', () => {
    let service: CourseService;

    beforeEach(async () => {
        service = new CourseService(knex);
        await knex('users').del();

        await knex.insert({
            email: "alex@tecky.com",
            password: '1234',
            name: "Alex Lau",
            image: "alex.jpeg",
            is_tutor: true,
            stripe_id: "acct_1HVXrIF1vd04vxx6",
            title: "首席導師",
            introduction:
              "Alex 曾榮獲多項本地及亞太科技大獎，作為多家科技公司的顧問和 Play More Limited 前首席技術官，他具備軟件開發和管理的專業知識。"
        }).into('users');
    })

    it('should get tutor info', async () => {
        const users = await service.getTutorInfo('alex@tecky.com');
        expect(users).not.toBe(undefined);
        expect(users.name).toBe('Alex Lau');
    });

    afterAll(() => {
        knex.destroy();
    })
});