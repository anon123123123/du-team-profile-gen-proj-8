// Imports
const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const templateGen = require('./src/templateGen')

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
    const managerHTML = `    <section class="emp-container">
    <section class="emp-header">
        <h3>${manager.name}<br>&#9749; ${manager.getRole()}</h3>
    </section>
    <ul class="emp-details">
        <li>ID: ${manager.id}</li>
        <li>Email:<br> 
            <a href="mailto:${manager.email}">${manager.email}</a></li>
        <li>Office number: ${manager.getofficeNumber()}</li>
    </ul>
</section>`
    return managerHTML
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
        const internHTML = `<section class="emp-container">
        <section class="emp-header">
            <h3>${x.name}<br> 🎓 ${x.getRole()}</h3>
        </section>
        <ul class="emp-details">
            <li>ID: ${x.id}</li>
            <li>Email:<br> 
                <a href="mailto:${x.email}">${x.email}</a></li>
            <li>School: ${x.getSchool()}</li>
        </ul>
    </section>`
        return internHTML
    }
    if(addTeamSelect === 'Engineer') {
        let x = await engineerAdd()
        const engineerHTML = `<section class="emp-container">
        <section class="emp-header">
            <h3>${x.name}<br>💻 ${x.getRole()}</h3>
        </section>
        <ul class="emp-details">
            <li>ID: ${x.id}</li>
            <li>Email:<br> 
                <a href="mailto:${x.email}">${x.email}</a></li>
            <li>Github: <a href="https://github.com/${x.getGithub()}">${x.getGithub()}</li>
        </ul>
    </section>`
        return engineerHTML
    } 
}

const writeHTML = async(html) => {
    const htmlContent = await templateGen(html)
    fs.writeFile('./dist/index.html', htmlContent, err => {
        if (err) {
            console.error(err)
            return
        }
        console.info('HTML File Created ./dist/index.html')
    })
}

// Main Function 
const main = async () => {
    let html = ""
    const managerHTML = await manager()
    html += managerHTML
    // Use while loop to get all employees 
    let moreEmployees = await menu()
    // The html add sections to HTML string
    html += moreEmployees
    while (moreEmployees !== 'None') {
        moreEmployees = await menu()
        
        if(moreEmployees !== 'None') {
            html += moreEmployees
        }
    }

    writeHTML(html)
}

// Init Main
main()