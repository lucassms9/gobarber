import User from '../models/User';
import bcrypt from 'bcryptjs';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userExists) {
      return res
        .status(400)
        .json({ error: { message: 'user already exists' } });
    }
    const { id, name, email, provider } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}
export default new UserController();
