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

    //TODO mandar email

    const enrollment = await Enrollment.create({
      student_id: studentId,
      plan_id: planId,
      start_date: startDate,
      end_date: addMonths(parseISO(startDate), plan.duration),
      price: plan.getTotalPrice(),
    })

    return res.json(enrollment);
  }

  async index(req, res) {
    const enrollments = await Enrollment.findAll();

    return res.json(enrollments);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().integer().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Invalid Request." });
    }

    const { plan_id, start_date } = req.body;
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);
    const plan = await Plan.findByPk(plan_id);

    if(!enrollment) {
      return res.status(404).json({ error: "Enrollment could not be found." });
    }

    if(!plan) {
      return res.status(404).json({ error: " Plan could not be found." });

    }

    let { price, end_date } = enrollment;

    if(enrollment.plan_id !== plan_id) {
      price = plan.getTotalPrice();
      end_date = addMonths(parseISO(start_date), plan.duration);
    }

    if(start_date !== enrollment.start_date) {
      end_date = addMonths(parseISO(start_date), plan.duration);
    }

    await enrollment.update({
      plan_id,
      start_date,
      end_date,
      price,
    });

    return res.json({
      plan_id, start_date, end_date, price
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(404).json({
        error: 'Enrollment could not be found.',
      });
    }

    await Enrollment.destroy({ where: { id } });

    return res.json({ ok: true });
  }
}

export default new EnrollmentController();
