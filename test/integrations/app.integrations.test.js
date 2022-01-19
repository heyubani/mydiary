const {expect} = require("chai");
const { send } = require("express/lib/response");
const request = require("supertest");
const app = require("../../src/index");

let token = '';

describe("index apis", () => {
    it("should test the base url successfully", (done)=> {
        request(app)
            .get("/")
            .set("Content-Type", "application/json")
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(200);
                done();
            })
    })
})


describe("signup api", () => {
    it("should test the signup url successfully", (done) => {
        request(app)
            .post("/api/signup")
            .set("Content-Type", "application/json")
            .send({
                firstName: "user",
                lastName:"anynames",
                email: "test@test.com",
                password: "test123"
            })
            .expect(201)
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(201);
                done();
            })
    })
});

// describe("signin api", () => {
//     it("should test the signin url successfully", (done)=> {
//         request(app)
//             .post("/api/signin")
//             .set("Accept", "application/json")
//             .send({
//                 email: "test@test.com",
//                 password: "test123"
//             })
//             .end((err, res) => {
//                 expect(res.statusCode).to.be.equal(200);
//                 done();
//             })
//     })
// })
