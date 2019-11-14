import Student from '../models/Student';
import Checkins from '../models/Checkin';
import { subDays } from 'date-fns';
import { Op, fn, col } from 'sequelize';

class CheckinController {
  async store(req, res) {

    const { id } = req.params;

    const student = Student.findByPk(id);

    if(!student) {
      return res.status(400).json({ error: "Student could not be found." });
    }

    let maxNumberOfCheckinsReached = false;

    await Checkins.findAndCountAll({
      where: {
        student_id: id,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    }).then(result => {
      if(result.count > 4) {
        maxNumberOfCheckinsReached = true;
      }
    });

    if(maxNumberOfCheckinsReached) {
      return res.status(400).json({ error: "Max number of checkins reached." });
    }


    const checkin = await Checkins.create({ student_id: id });

    return res.json(checkin);
  }
}

export default new CheckinController();
