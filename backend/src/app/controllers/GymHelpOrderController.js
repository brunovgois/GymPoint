import HelpOrder from "../models/HelpOrder";
import Student from "../models/Student";

import * as Yup from "yup";
import Mail from "../../lib/Mail";

class GymHelpOrderController {
  async index(req, res) {

    const helpOrder = await HelpOrder.findAll({
      attributes: ["student_id", "question"],
      where: {
        answer: null,
      }
    });

    return res.json(helpOrder);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Invalid Request." });
    }

    const { answer } = req.body;
    const { id } = req.params;

    const helpOrder = await HelpOrder.findByPk(id);

    const student = await Student.findByPk(helpOrder.student_id);

    if(!helpOrder) {
      return res.status(400).json({ error: "Help Order could not be found." });
    }

    await helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    await Mail.sendMail({
      to: `${student.name} <${student.email}`,
      subject: "Pergunta respondida",
      template: 'helpOrder',
      context: {
        question: helpOrder.question,
        answer: helpOrder.answer
      }
    })

    return res.json(helpOrder);
  }
}

export default new GymHelpOrderController();
