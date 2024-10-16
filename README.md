# HelpMeHelpYou
HelpMeHelpYou is a web app that simplifies the communication between freelancers and clients. It allows freelancers to create and send customised forms to clients, asking them to provide the necessary details for their projects. For example, a web developer can create a form for an about page, requesting the text, images, and layout preferences from the client. This way, the freelancer can avoid misunderstandings, save time, and deliver high-quality work. HelpMeHelpYou is built with React, MongoDB, and Express technologies.

## This Repository
This ‘HelpMeHelpYou’ repository is my execution of building a MERN stack, which means it uses MongoDB for the database, Express for the server-side code, React for the client-side code, and Node.js as the runtime environment. I built this website as my fourth of four projects for the Software Engineering Immersive course from [General Assembly](https://generalassemb.ly/). This site was created in six days as a solo project, fulfilling the basic requirements. But lots of work remains.

This website…
- The Express server-side code in this project uses the Model-View-Controller (MVC) design pattern for the server-side code, which divides the application logic into three components: the model, which manages the data and business logic; the view, which sends JSON data as a response from an api endpoint; and the controller, which processes user input and updates the model and view accordingly.
- React is used for the client-side code in this project. It uses a combination of functional and class components to create the UI. The components are organised into a hierarchy, with each component responsible for rendering a specific part of the UI. It is also used to handle user interactions and update the UI in response to changes in the application state. It uses a virtual DOM to efficiently update the UI without having to re-render the entire page. The React code in this project is compiled and bundled using Webpack. The bundled code is then served by the Express server and rendered in the user's web browser.
- MongoDB, a flexible and NoSQL document database, stores all the data in this project, such as users, templates, forms, and projects.
- The appearance is enhanced by Bootstrap sass, which allows some customization of variables. Font Awesome icons and Google fonts are also used to improve the look and feel.

# Live Preview
<p align="center">
Check out this site deployed on <a href="https://www.heroku.com/">Heroku</a>
<br>
  <a href="https://ga.hmhu.io/" target="_blank"><strong>https://ga.hmhu.io/</strong></a>
</p>

# Getting Started
## Prerequisites
- Node.js: This project is built using JavaScript and Node.js. You can download and install Node.js from the official website: https://nodejs.org/en/download/
- MongoDB: This project uses MongoDB as its database, so you’ll either need it installed and running locally on your machine or online on a service like MongoDB Atlas. You’ll need one database url added to the .env file.
```dotenv
// .env
DATABASE_URL=
```

## Installation
1. Clone the project repository: `git clone https://github.com/Dinssa/hmhu-ga.git`
2. Navigate to the root directory of the project using `cd <project_directoy>`
3. Open a terminal or command prompt and inside the project directory run the command `npm install` to install project dependencies.
4. Create a .env file in the root directory of the project and add the following environment variables:
```dotenv
// .env
SERVER_PORT=
DATABASE_URL=
JWT_SECRET=
SHORT_URL=
```  
The default value for Server_Port is 3001. You need to specify your MongoDB database as Database_URL. You also need to choose a random string as JWT_SECRET, which will be used to sign and verify JSON Web Tokens (JWTs). Finally, you need to set SHORT_URL to the domain name of your site or a shorter alternative that you want to use for short shareable links.  

6. Run the command `npm start` to start the application  
7. Open a web browser and navigate to http\:\/\/localhost:3000 to view the application.

# Brief
General Project Requirements:
- A working full-stack, single-page application hosted on Heroku.
- Incorporate the technologies of the MERN-stack:
    - MongoDB/Mongoose
    - Express
    - React
    - Node
- Have a well-styled interactive front-end.
- Communicates with the Express backend via AJAX.
- Implement token-based authentication. Including the ability of a user to sign-up, log in & log out.
- Implement authorization by restricting CRUD data functionality to authenticated users. Also, navigation should respond to the login status of the user.
- Have a well-scoped feature-set. Full-CRUD data operations are not required if one or more other features are included, for example:
    - Consume data from a third-party API.
    - Implement additional functionality if the user is an admin.
    - Implementation of a highly dynamic UI or data visualisation.

# Planning
## Entity Relationship Diagram
[![First ERD](https://onedrive.live.com/embed?resid=3AAE4294F4C93984%216564&authkey=%21ACEncFkDuIYFpWg&width=900)](#)  
I started planning this project by creating an ERD diagram that showed the structure and relationships of the database. It was a useful guide, but not the final version. As I coded, I realised that there were some inefficiencies and improvements that could be made.

The following ERD diagram is more accurate and reflects the changes I made:  
[![Final ERD](https://onedrive.live.com/embed?resid=3AAE4294F4C93984%216561&authkey=%21AL3odlI_nnXizUM&width=900)](#)  

The ERD consists of 4 main models and 3 embedded documents:
- User 
- Project (containing the links document)
- Form
- Template (containing the fields document which contains the options document)

## Mockups
[![Home page](https://onedrive.live.com/embed?resid=3AAE4294F4C93984%216562&authkey=%21ALSR-xu2UVDBRlw&width=900)](#)  

The home page, along with the ‘Clients’ and ‘Freelancers’ pages, provides clear and concise information about how the site can benefit vistors.  

[![Templates page](https://onedrive.live.com/embed?resid=3AAE4294F4C93984%216565&authkey=%21AJn6yBZuGhPHK2w&width=900)](#)  

The templates page enables freelancers to design and save customised forms that they can easily reuse for their projects.  

[![Template editor page](https://onedrive.live.com/embed?resid=3AAE4294F4C93984%216567&authkey=%21AN6rxyz3ewgnxS8&width=900)](#)  

The site’s key feature is the template editor, which allows freelancers to create custom forms with various input types, arrange them with drag and drop functionality, and configure the options for each field.  

[![Projects page](https://onedrive.live.com/embed?resid=3AAE4294F4C93984%216568&authkey=%21AH_bpfIypEFiM9E&width=900)](#)  

Using their own templates, freelancers can easily manage multiple projects for different clients or jobs, and generate forms for each aspect of their work. They can also copy a link to each form and share it with their clients, who can fill in the required information online.  

[![Landing page for clients before a form](https://onedrive.live.com/embed?resid=3AAE4294F4C93984%216566&authkey=%21APgR-m14HIL4SXU&width=900)](#)  

When a client receives a link from the freelancer, they can access the form through this landing page. They have the option to either log in and create an account, which allows them to store and review their forms, or to complete it as a guest without signing in.  

# Build Process
## First Steps
During the course, we created a reusable template MERN repository that had basic features such as signup and login forms, page structure, and user accounts with secure passwords and JWT tokens. For this project, I cloned that repository and used it as a starting point.

After the initial commit, I focused on building a core navigation bar and creating some pages that I had in mind. I also made sure that the design was responsive to different screen sizes, as I wanted to improve my skills in mobile development. Therefore, I used media queries to adjust the styling of the navigation and the page content area according to the device width.

Adopting a mobile first approach was a smart decision for this project, as it simplified the development process and ensured a better user experience across different devices.

## Backend
The backend of this MERN project is designed to follow the RESTful principles and to send JSON data as responses. It uses Express as the server framework and organises the code into models, controllers, and views. The models define the data structures and schemas for the database. The controllers handle the requests and business logic for each endpoint. The views format and return the JSON data to the client.

For this project, I wanted to create a robust and flexible backend that could handle all the possible operations and interactions with the data models. Therefore, I created every possible API endpoint that I could need and then some to manipulate the models. I also documented each endpoint using Swagger, which is a tool that helps you create clear and consistent documentation for your APIs. You can find the Swagger documentation for all the endpoints at https://ga.hmhu.io/api/. I tested each and every endpoint with sample data in Postman, including how each model interacted with the others.

You can also view the complete list of endpoints below:  

[![Available api endpoints](https://onedrive.live.com/embed?resid=3AAE4294F4C93984%216563&authkey=%21ALZ9GAg8fG7s5kE&width=700)](#)

If we follow one example use of the api to create a new project it starts in the projects page (ProjectsPage.jsx) where on the following line the user can click the “New Project” button:
```javascript
<button className='btn btn-outline-fourth projectBtn' onClick={() => setNewProjectModal(true)}><i class="fa-solid fa-square-plus"></i> New Project</button>
```
When you click on the New Project button, a modal window will pop up with a form that lets you create a new project. The form has some basic fields, such as project name and description. It also has an expandable section that allows you to add some optional links that are related to your project. You can use these links to save some useful resources or references for your project.  

[![New project form](https://onedrive.live.com/embed?resid=3AAE4294F4C93984%216573&authkey=%21AEke1WPF7n_ac0M&width=900)](#)

When a user clicks create the form data is passed along from the modal component to the projects page. 

```javascript 
// API
import {    searchProjects, 
            createProject, 
            deleteProject, 
            archiveProject, 
            unarchiveProject,
            addFormToProject
    } from '../../utilities/projects-service';

...

const handleProjectCreate = (project) => {
        createProject(project)
        setNewProjectModal(false)
}
```
This function on the project page invokes the create project function from the projects utility, which handles the whole process of using the backend API. 

```javascript
File: ../../utilities/projects-service.js

import * as projectsAPI from './projects-api';

export async function createProject(projectData) {
    return projectsAPI.createProject(projectData);
}

...
```
The projects-api service utility is a module that contains various functions for interacting with the projects collection in the database. It uses the API endpoints that I created and documented using Swagger.
```javascript
File: ../../utilities/projects-api.js

// Used to make HTTP requests
import sendRequest from './send-request';
const BASE_URL = '/api/projects';

// Create a project
export async function createProject(projectData) {
    return sendRequest(BASE_URL, 'POST', projectData);
}

...
```
If we take a look at the swagger api documentation to create a project   we must send a POST request to the API endpoint on the base url and that creates a new project document. 

[![Create project api documentation](https://onedrive.live.com/embed?resid=3AAE4294F4C93984%216571&authkey=%21APswFhpImEjcUi0&width=700)](#)

I have created similar utilities for interacting with the user, form, and template collections in the database. Each utility contains various functions that use the sendRequest utility to format and send RESTful requests to the corresponding API endpoints. The sendRequest utility is a module that simplifies the process of making HTTP requests and handling errors and responses. It also adds the necessary headers and parameters to the requests, such as the JWT token for authentication. By using these utilities, I can easily access and manipulate the data in the database without writing repetitive code.

As outlined in the server the route to create a project is as follows:
```javascript
router.post('/', ensureLoggedIn, projectController.create);
```
It makes sure a user is logged in with the ensureLoggedIn middleware and calls the controller method to create a project.
```javascript
async function create(req, res) {
    try{
        const decodedToken = decodeToken(req);
        req.body.user = decodedToken.user.id;
        const project = await Project.create(req.body);
        if (!project) throw new Error('Project not created');

        return res.json(project);
    } catch (err) {
        return res.status(404).json(err);
    }
}
```
The controller that handles the request for creating a new project has a middleware function called decodeToken. This function is common to all the controllers that need to access or modify the user data. It extracts the user id from the JWT token that is sent in the request header. This function is used whenever the logic requires filtering the data by user or to associate a user with a new document. 

This is an example of how the backend API works for this project. I have created several endpoints for different operations and interactions with the data models. Each endpoint follows a similar process of validating the request, performing the logic, and sending the response.

## Frontend
With the backend created it leaves just the frontend to create. There were times where I had to make adjustments to the backend at the point of creating certain frontend elements but it was mostly left untouched.
### Reusable Components
React components are reusable pieces of code that describe how a part of the UI should look and behave. They help organise and modularise the code, as each component has a specific role and feature. They also make the code easier to maintain and scale, as new features can be added by creating new components or modifying existing ones.

In the repository, you can see two navbars: Nav and TopNav. Nav is the first version, while TopNav is the upgraded version. By using the modular feature of React, I could easily swap the navbar in use in the App.js file. This was one of the moments that reminded me of the power of React. 

The search bar component was built from the start to be reusable in any page that needed to filter a list by a search query.
```jsx
import './SearchBar.css'
import { Form, FormControl, InputGroup } from 'react-bootstrap';

export default function SearchBar({searchQuery, setSearchQuery, searchPlaceholder="Search"}){

  function handleChanges(e){
    setSearchQuery(e.target.value)
  }

  function handleOnSubmit(e){
    e.preventDefault()
  }

  return (
      <div className="SearchBar">
          <Form className="search d-flex" onSubmit={handleOnSubmit}>
            <InputGroup>
              <InputGroup.Text id="search-icon"><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
              <FormControl
                type="search"
                placeholder={searchPlaceholder}
                className="search-input"
                aria-label="Search"
                value={searchQuery}
                onChange={handleChanges}
              />
            </InputGroup>
          </Form>
      </div>
    )
}
```
This component receives a search query and a function to update the search query from its parent component as props, and optionally a placeholder for the search input box. I used the useState hook to create a state variable for the search query, and passed it to the function prop to update it. I also used the useEffect hook to fetch the user’s templates or projects from the appropriate API endpoint and filter them by the search query whenever it changes. By doing this, the search query state is shared with another component that shows the search results. This component can then fetch and display the results that match the user’s input.

I had a hunch that the TemplateViewer component could be a reusable and versatile solution for this project, but I did not act on it until I faced a time crunch. It could render both templates and forms as HTML forms, and allow editing or viewing them. I realised that I could use the same component for both purposes by toggling a state variable that controlled the disabled property of each form element. This saved me time and effort, especially towards the end of the project.

### Templates
The main templates page has three components: the search component that I described earlier, the new templates bar where users can create their own templates, and the template list component that shows the available templates. The new templates bar lets users choose between creating a template from scratch in the Template Editor, or starting from one of the default templates that I, as an admin, have provided. However, since the Template Editor is not yet built, this feature is not functional and is left for future work. You can find more details about this in the final section of this ReadMe.

### Projects
The main projects page consists of four components: the search component, which is the same as the one on the templates page; the projects list component, which displays the user’s projects; the project view component, which shows the details of the selected project on the right side; and a modal with a form to create a new project, which I showed earlier when I talked about the backend method for creating projects.

This page has a responsive design that adapts to different screen sizes. On screens smaller than 768px wide, the layout is vertical, with the project view component below the projects list component. On screens larger than 768px wide, the layout is horizontal, with the project view component next to the projects list component. I also applied some additional CSS properties to each element to make them look good and user-friendly on both mobile and desktop devices.  

[![Projects page snipet](https://onedrive.live.com/embed?resid=3AAE4294F4C93984%216572&authkey=%21AK8Jf-ID9qQW8vM&width=700)](#)  

The project view component, shown above, displays the project’s details, such as title, description, and optional links, as defined in the ERD. It also shows the forms that belong to the project. To add a new form, the user can like the “Add Form” button which opens a modal that lets them choose one of their own templates and optionally add a name. If they don’t change the name, it will be the same as the template’s name. To add the new form to the project, the POST method on the API endpoint /api/projects/addform/{projectId}/{templateId} is used, which requires the ID of the selected project and the ID of the template selected in the form.

The user can view each form by clicking on it. This will take them to a forms page that uses the same TemplateViewer component as the templates page, but with a difference: the form fields are editable, meaning that the disabled property is set to false. The user can also copy the short URL of the form, which is composed of the SHORT_URL environment variable and a 6-digit unique ID, as shown in the ERD. The copy URL button will copy this URL to the clipboard, so that the user can easily share it with others.

Users have the option to archive a project, which means moving it to the bottom section of the project list and deactivating its forms. Archiving a project can be useful if users want to keep a record of their past projects, but don’t want them to clutter their current projects. To archive a project, users can click on the “Archive” button, which will open a modal window where they can confirm their action. Archived projects can be unarchived at any time, by clicking on the “Unarchive” button. This will restore the project to its original position and reactivate its forms. If a user decides they actually have no need for the project anymore they can also delete a project, which means removing it permanently from their project list and deleting its forms. Deleting a project is an irreversible action. To delete a project, users can click on the “Delete” button, which will open a modal window where they can confirm their action.

The “Edit” and “Clone” buttons are features that I have not implemented yet, but I plan to do so in the future. You can find more details about them in the final section of this ReadMe. Here is a brief overview of how they would work: The “Edit” button would let you modify the data of a project, such as the title, description, and links. It would open a modal window similar to the one for creating a new form, but with the current data pre-filled. You could then make any changes you want and save them. To edit a form, you would need to send a PUT request to this API endpoint: /api/projects/{id}. The “Clone” button would let you create a copy of a form, with the same data and structure as the original one. You could then use the copy as a template for a new form, or make changes to it without affecting the original one. To clone a form, you would need to send a POST request to this API endpoint: /api/projects/clone/{id}.

# Challenges
- The MVP was my priority for this project, not the template editor feature. I had to build a basic product that met the needs of the early users. This required developing the core functionalities, such as the backend and the template and project pages. These were challenging and time-consuming enough, and the template editor would have taken even longer. I delayed working on it until I had a working prototype. The template editor feature could be added later as an enhancement.

# Wins
- One of the aspects of this project that I am happy with is how I made the website mobile responsive. It can adjust to various screen sizes and devices, providing a smooth and consistent user experience. I used Bootstrap, a widely used CSS framework, to design responsive layouts and elements. I also added my own flair to the visual design of the project, showing my design interests and attention to detail. The website has a professional and appealing look that showcases my web development skills.

# Key Learnings & Takeaways
- Building a full stack app in React taught me how to use various capabilities and features to achieve the website I wanted, instead of being constrained by what I already knew. I did this by researching and finding packages that suited the feature I wanted to build, such as react-bootstrap, which is a popular package for creating responsive and modern UI components. I also learned how to use other packages to enhance the functionality and appearance of the website.

# Bugs
- I encountered a problem with updating the state of the project list when I added a new form. The new form was saved in the backend, but it did not show up on the frontend right away. I implemented a temporary solution by deselecting the project, so that if the user selected the same project again, it would display the updated list. However, this was not a reliable solution, and I need to find a better way to update the state. With more time I could either fix or refactor the project list.

# Future Improvements
## User Projects
The projects section is largely complete with just two buttons that need to be implemented. Thankfully the backend methods are ready and just need implementation in the frontend.:
- Users should be able to edit the data of project, such as the title, description, and links, after creating it. These are the same data fields that they fill in the new projects form. To edit the project data, they can click on the “Edit” button, which will open a modal window with the current data. They can then make any changes they want and save them.
- Users should also have the option to clone a project, which means creating a new project that belongs to them and has the same forms as the original project. The new project will have a similar name as the original one, but with “copy” added at the end. For example, if the original project is called “Web Project”, the cloned project will be called “Web Project copy”. The forms in the cloned project are not the same documents as the ones in the original project, but duplicates of them. This means that any changes made to the forms in either project will not affect the other project. Cloning a project can be useful if users want to use an existing project as a template for a new one, or if they want to experiment with different versions of a project. To clone a project, users can click on the “Clone” button, which will open a modal window where they can confirm their action.

## Template Editor
The ‘Template Editor’ feature is a crucial enhancement that I need to implement before launching this site to the public. This feature is essential for the minimum viable product (MVP) because it allows freelancers to create customised forms that collect the data they need. To achieve this, I will develop a dynamic and user-friendly form builder that uses drag and drop functionality and predefined options based on the models and the mockup. This will be a challenging and rewarding task that will result in a complex and impressive page.

## Static pages
The static informational pages such as the home, clients and freelancer page are ones that I have relegated to building at the end. These pages will only require one-time creation and infrequent updates. Their main purpose is to educate visitors about the website and its web application, and to persuade them to take action and use it. I anticipate that these pages will not take much time to build, but they will require careful design. This means creating the right text, imagery, and flow to attract and retain visitors.

