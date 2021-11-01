const TodoUser = require('../models/TodoUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.getUser = (req, res) => {
    console.log("getuser");
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
    } catch (err) {
        return res.sendStatus(400);
    }
}

exports.loginUser = async (req, res) => {
    const data = req.body;

    const user = await TodoUser.findOne({ email: data.email });

    try {
        if (!data.email || !data.password) res.status(401).json('Please fill in all required fields');

        const compare = await bcrypt.compare(data.password, user.password);

        if (!compare) res.status(401).json('Wrong email or password');

        if (compare) {
            const token = jwt.sign(
                { user: user._id },
                process.env.JWT_PRIVATE_KEY,
                { expiresIn: process.env.JWT_EXP_TIME }
            );
            res.status(201).send(token);
        }
    } catch (err) {
        res.status(500).send();
    }
};