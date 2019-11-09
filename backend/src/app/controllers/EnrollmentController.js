import * as Yup from "yup";
import { addMonths, parseISO } from "date-fns";
import Enrollment from "../models/Enrollment";
import Plan from "../models/Plan";
import Student from "../models/Student";

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      studentId: Yup.number()
        .integer()
        .required(),
      planId: Yup.number()
        .integer()
        .required(),
      startDate: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Invalid Request." });
    }

    const { planId, startDate, studentId } = req.body;

    const student = await Student.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: "Student could not be found." });
    }

    const plan = await Plan.findByPk(planId);

    if(!plan) {
      return res.status(404).json({ error: "Plan could not be found." });
    }

    const enrollment = await Enrollment.create({
      student_id: studentId,
      plan_id: planId,
      start_date: startDate,
      end_date: addMonths(parseISO(startDate), plan.duration),
      price: plan.getTotalPrice(),
    })

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
