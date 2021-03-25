//Time to start the show by including our modules.
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const output_dir = path.resolve(__dirname, "output");
const outputPath = path.join(output_dir, "index.html");

const render = require("./lib/htmlRenderer");

const squad = [];

//Adding Manager Details
const Manager = () => {
    return new Promise((res) => {
    inquirer.prompt([
        {
            type: "type",
            message: "Manager's name:",
            name: "name",
        },
        {
            type: "input",
            message: "ID",
            name: "id",
        },
        {
            type: "input",
            message: "Email Address",
            name: "email",
            // Validates your email
            default: () => {},
            validate: function (email) {
                if (valid) {
                    return true;
                } else {
                    console.log("Enter correct email")
                    return false;
                
                }
            }
        },
    {
        type: "input",
        message: "Office number",
        name: "number",
    },

    //Adding manager info
]).then(results => {
    const manager = new Manager(results.answer, results.id, results.email, results.number);
    squad.push(manager);
    res();
});
});
}

//Engineer and Intern details
const employee = () => {
    return new promise((resolve) => {
        inquirer.prompt([
            {
                type: "list",
                message: "Add employee",
                name: "position",
                choices: [
                    "Engineer",
                    "Intern",
                    {
                        name: "None",
                        value: false
                    }
                ]
            },
            {
                message: "Engineer's name",
                name: "name",
                when: ({position}) => position === "Engineer"
            },
            {
                message: "Intern's name",
                name: "name",
                when: ({position}) => position === "Intern"
            },
            {
                message: "Engineer's ID",
                name: "id",
                when: ({position}) => position === "Engineer"
            },
            {
               message: "Intern's ID",
               name: "id",
               when: ({position}) => position === "Intern", 
            },
            {
                message: "Engineer Email",
                name: "email",
                //Validation
                default: () => {},
                validate: function (email) {
                    if (valid){
                        return true;
                    } else {
                        console.log("Correct Email")
                        return false;
                    }
            },
            when: ({position}) => position === "Engineer"
        },
            {
                message: "Intern's email",
                name: "email",
                //Were validating the interns Email
                default: () => {},
                validate: function (email) {
                if (valid) {
                    return true;
                } else {
                    console.log("Correct Email")
                    return false;
                }
                },
            when: ({position}) => position === "Intern"
    },
    {
        message: "Engineer Github:",
        name: "github",
        when: ({position}) => position === "Engineer"

}
//I'm creating a function to import all engineer and intern data
        ]).then(results => {
            if (results.position) {
                switch (results.position) {
                    case "Engineer":
                        const engineer = new Engineer(results.name, results.email, results.id, results.github);
                        squad.push(engineer);
                        break;
                        case "Intern":
                            const intern = new Intern(results.name, results.email, results.id);
                            squad.push(intern);
                            break;

                }
                return Employee().then(() => resolve());
            } else {
                return resolve();
            }
        })
    })
}

//Were calling the functions
Manager().then(() => {
    return Employee();
    //Putting info in squad from the render function
}).then(() => {
    const templateHTML = render(squad)
    generatePage(templateHTML);
}).catch((err) => {
    console.log(err);
});

//Generating the html
const generatePage = (htmlPage) => {
    if (!fs.existsSync(output_dir)) {
        fs.mkdirSync(output_dir);
    }

    fs.writeFile(outputPath, htmlPage, "utf-8", (err) => {
        if(err) throw err;
        console.log("Page loaded");
    });
}




