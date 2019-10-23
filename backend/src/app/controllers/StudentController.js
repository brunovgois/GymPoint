import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const student = await Student.create(req.body);

    return res.json(student);
  }
}

export default new StudentController();
