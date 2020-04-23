import bcrypt from 'bcryptjs';
import User from '../models/User';

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

  async update(req, res) {
    const { oldPassword, email } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: {
          email,
        },
      });
      if (userExists) {
        return res
          .status(400)
          .json({ error: { message: 'user already exists' } });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res
        .status(400)
        .json({ error: { message: 'Password does not match' } });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}
export default new UserController();
