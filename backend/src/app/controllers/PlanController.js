import Plan from '../models/Plan';
import * as Yup from 'yup';

class PlanController {
  async store(req, res) {

    const { title } = req.body;

    const schema = Yup.object().shape({
      title: Yup.string()
        .required(),
      price: Yup.number()
        .required(),
      duration: Yup.number()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Invalid Request" });
    }

    const plan = await Plan.findOne({ where: { title } });

    if(plan) {
      return res.status(401).json({ error: "Plan with this title already exists." });
    }

   const { id, price, duration} = await Plan.create(req.body);

    return res.json({
      id, title, price, duration
    });
  }
}


export default new PlanController();
