const supertest = require('supertest');

const app = require('../app');

describe("Probar el sistema de autenticacion", ()=>{
    it("deberia de obtener un login con un user y password correctos", (done)=>{
        supertest(app).post("/login")
        .send({'email':'mike@uach.mx', 'password':'1234'})
        .expect(200)
        .end(function (err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        });
    });

    it("No deberia de obtener un login con user y password incorrectos", (done)=>{
        supertest(app).post("/login")
        .send({'email':'mikee@uach.mx', 'password':'dsaf343'})
        .expect(403)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                done();
            }
        })
    });
});
