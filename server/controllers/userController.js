const userService = require('../services/userService');

async function register(req, res) {
    try {
        const { name, email, password, role } = req.body;
        const user = await userService.registerUser(name, email, password, role);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const { token, user } = await userService.loginUser(email, password);
        
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({ user });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

async function logout(req, res) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie('token', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax'
    });
    res.json({ message: 'Logged out successfully' });
}

async function getAgents(req, res) {
     try {
         const agents = await userService.getAllAgents();
         res.json(agents);
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
}

async function updateProfile(req, res) {
    try {
        const { name, password } = req.body;
        const userId = req.user.id;
        const user = await userService.updateUserProfile(userId, name, password);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { register, login, logout, getAgents, updateProfile };
