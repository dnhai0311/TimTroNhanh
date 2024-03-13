import * as authService from '../services/auth';

export const Register = async (req, res) => {
    const { name, phone, password } = req.body;
    try {
        if (!name || !phone || !password)
            return res.status(400).json({
                err: 1,
                msg: 'missing input',
            });
        const response = await authService.RegisterService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail at auth controller' + error,
        });
    }
};

export const Login = async (req, res) => {
    const { name, phone, password } = req.body;
    try {
        if (!password) {
            return res.status(400).json({
                err: 1,
                msg: 'Password is missing',
            });
        }

        if (!name && !phone) {
            return res.status(400).json({
                err: 1,
                msg: 'Name or phone is missing',
            });
        }
        name ? console.log('admin logging in: ', name) : '';
        const response = await authService.LoginService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'fail at auth controller' + error,
        });
    }
};
