const { models } = require('../database');
const crypto = require('crypto');

const sessionController = {
    createSession: async (userId) => {
        const identifier = crypto.randomBytes(64).toString('hex');
        console.log("Creating session with identifier", identifier);

        const session = await models.Session.create({ identifier });
        await session.setUser(userId);
        
        return session;
    },
    getSession: async (identifier) => {
        return await models.Session.findByPk(identifier);
    },
    deleteSession: async (identifier) => {
        return await models.Session.destroy({ where: { identifier } });
    },
    rejectIfNotAuthorized: async (request, userId) => {
        const authHeader = request.get("Authorization");

        if (!authHeader) {
            throw Error("Unauthorized");
        }

        const token = authHeader.split(" ")[1];

        console.log("Checking session", token);

        const session = await models.Session.findByPk(token);

        if (!session || session.UserId != userId) {
            throw Error("Unauthorized");
        }
    }
};

module.exports = sessionController;