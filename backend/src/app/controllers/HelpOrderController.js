import * as Yup from "yup";
import HelpOrder from "../models/HelpOrder";
import Student from "../models/Student";

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Invalid Request." });
    }

    const { question } = req.body;
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: "Student could not be found." });
    }

    const helpOrder = await HelpOrder.create({
      student_id: id,
      question,
    });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const { id } = req.params;

    const helpOrders = await HelpOrder.findAll({
      attributes: ["question", "answer"],
      where: {
        student_id: id
      }
    });
    return res.json(helpOrders);
  }
}

export default new HelpOrderController();
