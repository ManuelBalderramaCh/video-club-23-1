const supertest = require('supertest');
const app = require('../app');
var key = "";
var id = "";

describe('Probar el inicio de sesion', ()=>{
    it('Deberia de obener un login con usuario y contraseña correcto' ,
    (done)=>{
        supertest(app).post('/login')
        .send({
            'email':'mike@uach.mx',
            'password':'1234'
        })
        .expect(200)
        .end(function(err, res){
            key = res.body.obj;
            done();
        });
    });
});

describe('Probar las rutas de los miembros', ()=>{
    it('Deberia de crear una miembro', (done)=>{
        supertest(app).post('/members')
        .send({
            name:'Miguel', 
            lastName:'Cortinas',
            phone:'1254323',
            status:'true',
            city:'Chihuahua',
            country:'Mexico',
            number:'1342',
            state:'Chihuahua',
            street:'Calle'
        })
        .set('Authorization', `Bearer ${key}`)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                id = res.body.objs._id;
                expect(res.statusCode).toEqual(200);
                done();
            }
        })
    })
    it('deberia de obtener la lista de miembros', (done)=>{
        supertest(app).get('/members')
        .set('Authorization', `Bearer ${key}`)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                expect(res.statusCode).toEqual(200);
                done();
            }
        })
    })
    it('deberia de encontrar un miembro', (done)=>{
        supertest(app).get(`/members/${id}`)
        .set('Authorization', `Bearer ${key}`)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                expect(res.statusCode).toEqual(200);
                done();
            }
        })
    })
    it('deberia de editar un miembro', (done)=>{
        supertest(app).patch(`/members/${id}`)
        .send({
            name:'Miguel', 
            lastName:'Cortinas',
            phone:'1254323',
            status:'true',
            city:'Chihuahua',
            country:'Mexico',
            number:'1342',
            state:'Chihuahua',
            street:'Calle'
        })
        .set('Authorization', `Bearer ${key}`)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                expect(res.statusCode).toEqual(200);
                done();
            }
        })
    })
    it('deberia de reemplazar un miembro', (done)=>{
        supertest(app).put(`/members/${id}`)
        .send({
            name:'Miguel', 
            lastName:'Cortinas',
            phone:'1254323',
            status:'true',
            city:'Chihuahua',
            country:'Mexico',
            number:'1342',
            state:'Chihuahua',
            street:'Calle'
        })
        .set('Authorization', `Bearer ${key}`)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                expect(res.statusCode).toEqual(200);
                done();
            }
        })
    })
    it('eliminar un miembro', (done)=>{
        supertest(app).delete(`/members/${id}`)
        .set('Authorization', `Bearer ${key}`)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                expect(res.statusCode).toEqual(200);
                done();
            }
        })
    })
})
