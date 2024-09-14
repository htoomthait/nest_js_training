import { Controller, Get, HttpCode, HttpStatus, Param, Res } from '@nestjs/common';
import { GenericApiResponseDto } from 'src/dto/generic_api_response.dto';
import { StudentService } from './student.service';
import { Response } from 'express';

@Controller('student')
export class StudentController {

    private fmtRep: GenericApiResponseDto = new GenericApiResponseDto();

    constructor(private readonly studentService: StudentService) { }


    @Get('list-all')
    @HttpCode(202)
    getStudentList(@Res() res: Response) {
        // Get all student from service
        const dummyStudents = this.studentService.getAllStudent();

        // Format the response
        this.fmtRep = {
            status: "success",
            message: "Successfully queried students!",
            data: dummyStudents
        }

        // API response
        return res
            .status(HttpStatus.ACCEPTED)
            .send(this.fmtRep);
    }

    @Get('get-by-id/:id')
    getStudentById(@Param('id') id: number) {
        this.fmtRep = {
            status: "success",
            message: "Successfully queried student!",
            data: `This is student with id ${id}`
        }

        return this.fmtRep;
    }

}
