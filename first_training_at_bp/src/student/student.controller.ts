import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
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
    getStudentById(@Param('id') id: string, @Res() res: Response) {
        const searchedStudent = this.studentService.getStudentById(parseInt(id));
        let httpStatus = 200;



        if (searchedStudent) {
            this.fmtRep = {
                status: "success",
                message: "Successfully queried student!",
                data: searchedStudent
            }
            httpStatus = HttpStatus.OK;
        }
        else {
            this.fmtRep = {
                status: "not found",
                message: "student not found",
                data: null
            }
            httpStatus = HttpStatus.NOT_FOUND;
        }



        return res.status(httpStatus).send(this.fmtRep);
    }

    @Post('add-new')
    addNewStudent(@Body() newStudent: any, @Res() res: Response) {
        let httpStatus = 200;

        const createdStudent = this.studentService.addNewStudent(newStudent);

        if (createdStudent) {
            this.fmtRep = {
                status: "success",
                message: "Successfully created student!",
                data: createdStudent
            }
            httpStatus = HttpStatus.CREATED;
        }
        else {
            this.fmtRep = {
                status: "error",
                message: "student cannot be created",
                data: null
            }
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return res.status(httpStatus).send(newStudent);
    }

    @Delete('delete-by-id/:id')
    deleteById(@Param("id") id: string, @Res() res: Response) {

        let httpStatus = 200;
        const deletedStatus = this.studentService.deleteStudentById(parseInt(id));

        if (deletedStatus == 200) {
            this.fmtRep = {
                status: "success",
                message: "Successfully created student!",
                data: `Student with id ${id} has been deleted!`
            }
            httpStatus = HttpStatus.ACCEPTED;
        } else if (deletedStatus == 404) {
            this.fmtRep = {
                status: "not found",
                message: `student cannot be found with id ${id}`,
                data: null
            }
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        else {
            this.fmtRep = {
                status: "error",
                message: "student cannot be deleted",
                data: null
            }
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        return res.status(httpStatus).send(this.fmtRep);

    }

}
