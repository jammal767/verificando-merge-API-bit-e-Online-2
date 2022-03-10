const Simulation = require('../../models/simulation');
const Log = require('../../models/log');
const Client = require('../../models/user');
const Schedule = require('../../models/schedule');

//List Simulations
exports.simulations = () => {
    return new Promise((resolve, reject) => {
        Simulation.aggregate([
            { $lookup: { from: 'steps', foreignField: 'number', localField: 'step', as: 'step' } },
            { $unwind: '$step' },
            { $lookup: { from: 'users', foreignField: '_id', localField: 'user', as: 'user' } },
            { $unwind: '$user' },
            { $project: { _id: 1, complete: 1, canceled: 1, results: 1, user: 1, step: 1, createdAt: 1, proposal: 1, user: { avatar: 1, name: 1, email: 1 } } },
            { $sort: { 'createdAt': -1 } },
            { $limit: 4 }
        ]).exec(async (err, simulations) => {
            if (err) {
                const e = {
                    error: true,
                    code: 400,
                    msg: __('fail_list_simulations')
                }
                reject(e)
                return false
            }

            const total = await Simulation.countDocuments().then((c) => c)

            const result = {
                data: simulations,
                total: total
            }
            resolve(result)
        })
    })
}

// List Logs
exports.logs = () => {
    return new Promise((resolve, reject) => {
        Log.aggregate(
            [
                { $sort: { createdAt: -1 } },
                { $lookup: { from: 'users', foreignField: '_id', localField: 'user', as: 'user' } },
                { $unwind: '$user' },
                { $project: { user: { name: 1, _id: 1, avatar: 1 }, description: 1, createdAt: 1 } },
                { $limit: 4 }
            ]
        ).exec(async (err, logs) => {
            if (err) {
                let e = {
                    error: true,
                    code: 400,
                    msg: __('fail_list_logs')
                }
                reject(e)
                return false
            }

            const total = await Log.countDocuments().then((c) => c)

            const result = {
                data: logs,
                total: total
            }

            resolve(result)
        })
    })
}

// List Clients
exports.clients = () => {
    return new Promise((resolve, reject) => {
        Client.find({ profile: 'Client' }, async (err, users) => {
            if (err) {
                const e = {
                    error: true,
                    code: 400,
                    msg: __('fail_list_users')
                }
                reject(e)
                return false
            }

            const total = await Client.countDocuments({ profile: 'Client' }).then((c) => c)

            const result = {
                data: users,
                total: total
            }
            resolve(result)
        }).limit(4).sort({ createdAt: -1 })
    })
}

// List All Schedules
exports.schedules = (query) => {
    return new Promise((resolve, reject) => {
        Schedule.find({}, async (err, schedules) => {

            if (err) {
                const e = {
                    error: true,
                    code: 400,
                    msg: __('Falha ao listar os agendamentos')
                }
                reject(e)
                return false
            }

            const total = await Schedule.countDocuments().then((c) => c)

            const result = {
                data: schedules,
                total: total
            }

            resolve(result)
        }).populate('user unit', 'number name avatar phone photos').populate({
            path: 'unit',
            select: '_id number enterprise',
            populate: { path: 'enterprise', select: '_id name' }
        }).sort({ createdAt: -1 }).limit(4)
    })
}