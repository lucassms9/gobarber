import User from '../models/User';
import File from '../models/File';

class ProviderController {
  async index(req, res) {
    const user = await User.findAll({
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
      attributes: ['id', 'name', 'email', 'avatar_id'],
      where: { provider: true },
    });
    return res.status(200).json(user);
  }
}
export default new ProviderController();
