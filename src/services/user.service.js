const humps = require('humps');
const UserModel = require('../models/user.model');
const UserAddress = require('../models/userAddress.model');

class UserService {
  async getUserByEmail(email) {
    return UserModel.query()
      .select(
        'u.id',
        'u.first_name',
        'u.last_name',
        'u.email',
        'u.phone',
        'u.user_status',
        'ur.role',
        'u.password'
      )
      .alias('u')
      .leftJoin({ ur: 'user_role' }, (join) => {
        join.on('ur.user_id', 'u.id');
      })
      .where({
        'u.email': email,
      })
      .first();
  }

  async updateUser(user, data) {
    await UserModel.transaction(async (trx) => {
      await UserModel.query(trx)
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
        })
        .where({
          id: user.id,
        });

      if (data.addresses && data.addresses.length > 0) {
        for (const element of data.addresses) {
          element.user_id = user.id;
        }

        const checkUserAddress = await UserAddress.query(trx)
          .select()
          .where({ user_id: user.id });

        if (checkUserAddress) {
          await Promise.all([
            UserAddress.query(trx).delete().where({ user_id: user.id }),

            UserAddress.query(trx).insertGraph(
              humps.decamelizeKeys(data.addresses)
            ),
          ]);
        } else {
          UserAddress.query().insertGraph(humps.decamelizeKeys(data.addresses));
        }
      }
    });
  }
}

module.exports = new UserService();
