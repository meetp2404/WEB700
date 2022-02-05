class Data
{
    constructor(students ,courses)
    {
        this.students = students;
        this.courses = courses;

    }

}

var dataCollection = null;


module.exports.initialize = function()
{
    const fs = require('fs');

    return new Promise(function(resolve, reject){ 
        fs.readFile('./data/students.json', 'utf8', function(err, dataOfStudents){
        if (err){
            reject('unable to read students.json'); // or reject the promise (if used in a promise)
            return; // exit the function
        }
        
        let dataStudents = JSON.parse(dataOfStudents); // convert the JSON from the file into an array of objects
        //resolve("Courses data retrive successful")
        //console.log(dataStudents)
    
            fs.readFile('./data/courses.json', 'utf8', function(err, dataOfCourse){
                if (err){
                    reject('unable to read courses.json'); // or reject the promise (if used in a promise)
                    return; // exit the function
                }
                
                let dataCourse = JSON.parse(dataOfCourse); // convert the JSON from the file into an array of objects
                //console.log(dataCourse)

                dataCollection = new Data(dataStudents,dataCourse);
                getAllStudents()
                function getAllStudents(){
                    return new Promise(function(resolve, reject){ 
                        studentsData = dataCollection.students
                        
                        if(studentsData.length == 0){
                            reject('no results returned');
                        }

                        console.log('Successfully retrieved',studentsData.length,'students')
                    });
                }
                getCourses()
                getTAs()
                function getTAs(){
                    return new Promise(function(resolve, reject){  
                        studentsData = dataCollection.students;
                        studentTA = [];
                        
                        studentsData.forEach(function(item){
                            if (item['TA'] == true){
                                studentTA.push(item);
                            }
                        });
                        if(studentTA.length == 0){
                            reject('no results returned');
                        }
                        console.log('Successfully retrieved',studentTA.length,'TAs')
                    });
                }
                function getCourses(){
                    return new Promise(function(resolve, reject){ 
                        coursesData = dataCollection.courses
                        if(coursesData.length == 0){
                            reject('no results returned');
                        }
                        console.log('Successfully retrieved',coursesData.length,'courses')
                    });
                }
            });
        });
    });
}

