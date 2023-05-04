const express = require('express');
const bcrypt = require('bcrypt');
const async = require('async');


const User = require('../models/user');
const adminAbility = require('../models/adminAbility')
const userAblility = require('../models/userAbility');
const Profile = require('../models/profile');
const Permission = require('../models/permission');

var map = {}
map['admin'] = adminAbility;
map['user'] = userAblility;

async function list(req, res, next) {
    let id = req.body.id;
    let user = await User.findOne({"_id":id});
    let profileName;
    var query;

    user = JSON.parse(JSON.stringify(user));
    user._profiles.forEach(async(profileId) => {
        profileName = await Profile.findOne({"_id":profileId});
        profileName = JSON.parse(JSON.stringify(profileName))._description;
        try {
            query = await User.accessibleBy(map[profileName], 'read').populate({
                path: '_profiles',
                populate: { path: '_permissions' }
            });
            res.status(200).json({
                message: res.__('ok.users'),
                obj: query
            })
          } catch (error) {
            console.log(error) // ForbiddenError;
            res.status(500).json({
                message: 'ERROR',
                obj: error
            })
          }
    })
    
    // user = JSON.parse(JSON.stringify(user))
    // user._profiles.forEach(async(profileId) => {
    //     profilePermissions = await Profile.findOne({"_id":profileId});
    //     profilePermissions = JSON.parse(JSON.stringify(profilePermissions))._permissions;
    //     console.log(profilePermissions)
    //     profilePermissions.forEach(async(permissionId) => {
    //         let read = await Permission.findOne({"_id":permissionId});
    //         read = JSON.parse(JSON.stringify(read))._type;
    //         console.log(read);
    //         if(read == "READ"){
    //             User.find().populate('_profiles').then(
    //                 objs=>res.status(200).json({
    //                     message: 'Lista de actores del sistema',
    //                     obj: objs
    //                 })
    //             )
    //         }
    //     })
    // })
    
    // if(permissions[user._role].can('read', 'User')){
    //     let page = req.params.page ? req.params.page : 1;
    //     User.paginate({}, {page:page, limit:20}).then(
    //         objs=>res.status(200).json({
    //             message: 'Lista de actores del sistema',
    //             obj: objs
    //         })
    //     ).catch(
    //         ex=>res.status(500).json({
    //             message: 'No se pudo consultar la informacion de los actores',
    //             obj: ex
    //         })
    //     );
    // }else{
    //     res.status(500).json({
    //         message: 'No tiene permiso'
    //     })    
    // }

    
    
}

function index(req, res, next) {
    const id = req.params.id;
    User.findOne({"_id":id}).then(
        obj=>res.status(200).json({
            message: `User almacenado con Id ${id}`,
            obj: obj
        })
    ).catch(
        ex=>res.status(500).json({
            message: 'No se pudo consultar la informacion de los usuarios',
            obj: ex
        })
    );
}

async function create(req, res, next) {
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;

    //Generar el salt con las iteraciones para generar la cadena
    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    let user = new User({
        name: name,
        lastName: lastName,
        email: email,
        password: passwordHash,
        phone: phone,
        salt: salt
    });

    user.save().then(obj => res.status(200).json({
        message: "Usuario creado correctamente",
        obj: obj
        })).catch(ex => res.status(500).json({
            message: "No se pudo almacenar el usuario",
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let phone = req.body.phone ? req.body.phone : "";
    let email = req.body.email ? req.body.email : "";
    let password = req.body.password ? req.body.password : "";

    let user = new Object({
        _name: name,
        _lastName: lastName,
        _phone: phone,
        _email: email,
        _password: password
    });

    User.findOneAndUpdate({"_id":id}, user, {new: true})
        .then(obj => res.status(200).json({
            message: "Usuario actualizado correctamente",
            obj: obj
        })).catch(ex => res.status(500).json({
            message: "No se pudo reemplazar el usuario",
            obj: ex
        }));
}

function update(req, res, next) {
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;

    let user = new Object();

    if(name)
        user._name = name;

    if(lastName)
        user._lastName = lastName;

    if(phone)
        user._phone = phone;

    if(email)
        user._email = email;
    
    if(password)
        user._password = password;
    
    
    User.findOneAndUpdate({"_id":id}, user, {new: true})
    .then(obj => res.status(200).json({
        message: "Usuario actualizado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo reemplazar el usuario",
        obj: ex
    }));
}

function destroy(req, res, next) {
    const id = req. params.id;
    User.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        message: "Usuario eliminado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        message: "No se pudo eliminar al usuario",
        obj: ex
    }))
}

module.exports = { 
    list,
    index,
    create,
    replace,
    update,
    destroy
};