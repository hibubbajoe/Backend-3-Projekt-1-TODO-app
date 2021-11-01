const TodoUser = require('../models/TodoUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.getUser = (req, res) => {
    console("getuser");
    res.send("getuser");
}

exports.addNewUser = async (req, res) => {
    const data = req.body;
    const user = await new TodoUser(data);

    try {
        if (!user) res.sendStatus(400);

        const newUser = await user.save();
        const token = jwt.sign(
            { user: newUser._id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: process.env.JWT_EXP_TIME }
        );
        return res.status(201).send(token);
    } catch (error) {
        return res.sendStatus(400);
    }
}
