import UserDao from "../daos/mongodb/user.dao.js";
import { UserModel } from "../daos/mongodb/models/user.model.js";

const userDao = new UserDao(UserModel);

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.login(email, password);
        if (!user) {
            res.status(401).json({ message: "No estás autorizado" });
        } else {
            req.session.info = {
                loggedIn: true,
                email,
            };
            res.status(200).json({ message: 'Welcome!', sessionId: req.sessionID });
        }
    } catch (error) {
        res.status(500).json({ message: 'There was an error!' });
    }
};

export const register = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            const user = await userDao.register({
                ...req.body,
                role: "admin",
            });
            if (!user) res.status(401).json({ message: "Error when registering user!" });
            else res.status(200).json({ message: 'User registered correctly!' })
        }

        const user = await userDao.register(req.body);
        if (!user) res.status(401).json({ message: "Error when registering user!" });

        else res.status(200).json({ message: 'User registered correctly!' })
    } catch (error) {
        throw new Error(error);
    }
};

export const infoSession = (req, res) => {
    res.json({
        session: req.session,
        sessionId: req.sessionID,
        cookies: req.cookies,
    });
};

export const logout = (req, res) => {
    req.session.destroy();
    res.send("Logged out correctly!");
};
