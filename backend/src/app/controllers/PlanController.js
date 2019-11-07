import Plan from "../models/Plan";
import * as Yup from "yup";

class PlanController {
  async store(req, res) {
    const { title } = req.body;

    const schema = Yup.object().shape({
      title: Yup.string().required(),
      price: Yup.number().required(),
      duration: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Invalid Request" });
    }

    const plan = await Plan.findOne({ where: { title } });

    if (plan) {
      return res
        .status(401)
        .json({ error: "Plan with this title already exists." });
    }

    const { id, price, duration } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      price,
      duration
    });
  }

  async index(req, res) {
    const plans = await Plan.findAll({
      order: ["price"],
      attributes: ["title", "price", "duration"]
    });
    return res.json(plans);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      price: Yup.number(),
      duration: Yup.number()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Invalid Request." });
    }

    const { title } = req.body;

    const plan = await Plan.findByPk(req.params.id);

    if (!plan) {
      return res.status(400).json({ error: "Plan not found." });
    }

    if (title && title != plan.title) {
      const planAlreadyExists = await Plan.findOne({ where: { title } });

      if (planAlreadyExists) {
        return res.status(400).json({ error: "Plan already exists." });
      }
    }

    const { id, price, duration } = await plan.update(req.body);

    return res.json({
      id,
      title,
      price,
      duration
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: "Plan not found." });
    }

    await plan.destroy({
      where: { id }
    });

    return res.json({ ok: true });
  }
}

export default new PlanController();
