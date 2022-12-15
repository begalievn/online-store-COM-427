const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo, User, BasketDevice} = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, typeId, info } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
    
            const device = await Device.create({ name, price, typeId, img: fileName });
    
            if(info) {
                info = JSON.parse(info);
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            
            return res.json(device);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
        
    }
    
    async getAll(req, res) {
        let { brandId, typeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 10;
        let offset = page * limit - limit;
        let devices;
        if(!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset });
        }
        if(brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
        }
        if(!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
        }
        if(brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
        }
        return res.json(devices);
    }
    
    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: 'info'}]
        });
        return res.json(device);
    }
    
    async addRating(req, res, next) {
        try {
            const { id, userId } = req.params;
            console.log({id, userId});
            const device = await Device.findOne({
                where: { id }
            });
            
            const user = await User.findOne({
                where: { id: userId }
            });
            
            if(device === null || user === null) {
                throw new Error('Пользователь или блюдо не найдены');
            }
            let rating = device.rating + 1;
            console.log({rating});
            
            let alreadyRated = await BasketDevice.findOne({
                where: { basketId: userId, deviceId: id}
            });
            
            if(alreadyRated) {
                throw new Error('Пользователь уже рейтил');
            }
            
            const newRating = await BasketDevice.create({ deviceId: id, basketId: userId });
            
            const result = await Device.update(
                {
                    rating
                },
                {
                    where: { id }
                }
            )
            return res.send(true);
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }
    
    async getFromBasket(req, res, next) {
        const { id } = req.params;
        
        const user = await User.findOne({where: { id }});
        
        if(user === null) {
            res.json('User not found');
        }
        const result = await BasketDevice.findAll({
            where: {
                basketId: id
            }
        })
        
        const meals = [];
        
        for await (let element of result) {
            let id = element.deviceId;
            let res = await Device.findOne({ where: { id }});
            meals.push(res);
        }
        console.log(meals);
        res.json(meals);
    }
}

module.exports = new DeviceController();
