// Imports
const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// Questions 
const questionsManager = [
    {
        type: 'input',
        name: 'name',
        message: "What's your managers name?",
    },
    {
        type: 'input',
        name: 'id',
        message: "What's your Managers id? Numbers Only:",
    },
    {
        type: 'input',
        name: 'email',
        message: "What's your Managers email?",
    },
    {
        type: 'input',
        name: 'officeNum',
        message: "What's your Managers office number?",
    }
]

const menuQuestion = [
    {
        type: 'checkbox',
        message: 'Add Employee',
        name: 'addTeam',
        choices: [
            new inquirer.Separator('### Employee ###'),
            {
                name: 'No more employees',
            },
            {
                name: 'Engineer',
            }, 
            {
                name: 'Intern',
            }
        ],     
        validate(answer) {
            if (answer.length < 1) {
              return 'You must choose a employee or none.';
            }
            return true;
          }
    }
]

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What's your Intern's name?",
    },
    {
        type: 'input',
        name: 'id',
        message: "What's your Intern's id? Numbers Only:",
    },
    {
        type: 'input',
        name: 'email',
        message: "What's your Intern's email?",
    },
    {
        type: 'input',
        name: 'school',
        message: "What's your Intern school?",
    }
]

const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What's your engineer's name?",
    },
    {
        type: 'input',
        name: 'id',
        message: "What's your engineer's id? Numbers Only:",
    },
    {
        type: 'input',
        name: 'email',
        message: "What's your engineer's email?",
    },
    {
        type: 'input',
        name: 'github',
        message: "What's your engineer's Github username?",
    }
]

// Employee Addition functions 
const engineerAdd = async () => {
    const questions = await inquirer.prompt(engineerQuestions).then((answers) => {
        return answers
    });
    const engineer = await new Engineer(questions.name, questions.id, questions.email, questions.github)
    return engineer
}

const internAdd = async () => {
    const questions = await inquirer.prompt(internQuestions).then((answers) => {
        return answers
    });
    const intern = await new Intern(questions.name, questions.id, questions.email, questions.school)
    return intern
}

const manager = async () => {
    const questions = await inquirer.prompt(questionsManager).then((answers) => {
        return answers
    });
    const manager = await new Manager(questions.name, questions.id, questions.email, questions.officeNum)
    return manager
}

const menu = async () => {
    const questions = await inquirer.prompt(menuQuestion).then((answers) => {
        return answers
    });
    const addTeamSelect = questions.addTeam[0]
    if(addTeamSelect === 'No more employees') {
        return 'None'
    }
    if(addTeamSelect === 'Intern') {
        let x = await internAdd()
        console.log(x)
        console.log(x.getRole())
        const internHTML = ``
        return x
    }
    if(addTeamSelect === 'Engineer') {
        let x = await engineerAdd()
        return x
    } 
}

// Main Function 
const main = async () => {
    const managerObj = await manager()
    // Use while loop to get all employees 
    let moreEmployees = await menu()
    let allEmployees = []
    allEmployees.push(moreEmployees)
    while (moreEmployees !== 'None') {
        moreEmployees = await menu()
        
        if(moreEmployees !== 'None') {
            allEmployees.push(moreEmployees)
        }
    }
    console.log(managerObj)
    console.log(allEmployees)
}

// Init Main
main()