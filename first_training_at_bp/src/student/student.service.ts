import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class StudentService {
    private logger = new Logger(StudentService.name);
    private allStudentData = [
        {
            id: 2,
            fullname: "John Doe",
            dob: "2010-09-01",
            gender: "male",
            phone_no: "959797834962",
            email: "johndoe@xyz.com",
            stauts: "active",
            created_at: "2024-09-14 16:14:00",
            updated_at: "2024-09-14 16:14:00"
        },
        {
            id: 3,
            fullname: "Jane Doe",
            dob: "2010-10-05",
            gender: "female",
            phone_no: "959792734753",
            email: "janedoe@xyz.com",
            stauts: "active",
            created_at: "2024-09-14 16:15:00",
            updated_at: "2024-09-14 16:15:00"
        },
        {
            id: 4,
            fullname: "Johnny Bob",
            dob: "2010-07-11",
            gender: "female",
            phone_no: "959792734753",
            email: "johnnybob@xyz.com",
            stauts: "active",
            created_at: "2024-09-14 16:17:00",
            updated_at: "2024-09-14 16:17:00"
        }
    ];

    getAllStudent() {
        return this.allStudentData;
    }

    getStudentById(id: number) {

        const studentSearched = this.allStudentData
            .find(student => student.id == id);

        return studentSearched;

    }

    addNewStudent(newStudent: any) {
        this.allStudentData.push(newStudent);

        return newStudent;
    }

    deleteStudentById(id: number) {
        const checkToDelete = this.allStudentData.find(student => student.id = id);
        this.logger.debug(checkToDelete);

        if (!checkToDelete) {
            return 404;
        }

        this.allStudentData = this.allStudentData.filter(student => student.id != id);

        return 200;
    }
}
