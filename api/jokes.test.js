const request = require('supertest')
const db= require('../data/db_config')
const server = require('../server')
const joke = require('./jokesModel')

const joke1 = {description:"my mom come to hunt me",photos:"mom's photo" }
const joke2 = {description:"my dad come to hunt me",photos:"dad's photo" }
beforeAll(async ()=> {
    await db.migrate.rollback()
    await db.migrate.latest()
})
beforeEach(async ()=> {
    await db("jokes").truncate()
})
afterAll(async ()=> {
    await db.destroy()
})

it('correct env var', ()=> {
    expect(process.env.DB_ENV).toBe('testing')
})
describe("jokes model functions", ()=> {
    describe("create joke", ()=> {
        it('add joke to the db', async ()=> {
            let jokes
            await joke.createJoke(joke1)
            jokes= await db("jokes")
            expect(jokes).toHaveLength(1)

            await joke.createJoke(joke2)
            jokes = await db('jokes')
            expect(jokes).toHaveLength(2)
        })
        it("inserted joke and photo", async ()=> {
            const jokes = await joke.createJoke(joke1)
            expect(jokes).toMatchObject({joke_id:2, ...jokes})
        })
    })
    describe('delete / -deletes joke', ()=> {
        it('removes joke from db', async ()=> {
            const[joke_id] = await db('jokes').insert(joke1)
            let jokes = await db('jokes').where({joke_id}).first()
            expect(jokes).toBeTruthy()
            await request(server).delete("/jokes/" + joke_id)
            jokes = await db("jokes").where({joke_id}).first()
            expect(jokes).toBeFalsy()
        })
        it("respond with the deleted joke", async ()=> {
            await db("jokes").insert(joke1)
            let joke= await request(server).delete("/jokes/1")
            expect(joke.body).toMatchObject(joke1)
        })
    })
})