# README

This project is a design a front-end for an email client, developed with Django, Javascript, HTML and CSS, that makes API calls to send and receive emails. The full specification of the projects can be found [here]([https://example.com](https://cs50.harvard.edu/web/2020/projects/3/mail/)).

#### Project Description

The initial code provides an API for e-mail client. Based on this API, the frontend needes to allow de user:
Send Mail: When a user submits the email composition form, add JavaScript code to actually send the email. 
Mailbox: When a user visits their Inbox, Sent mailbox, or Archive, load the appropriate mailbox. View Email: When a user clicks on an email, the user should be taken to a view where they see the content of that email. 
Archive and Unarchive: Allow users to archive and unarchive emails that they have received. 
Reply: Allow users to reply to an email. 


    [
        {
            "id": 100,
            "sender": "foo@example.com",
            "recipients": ["bar@example.com"],
            "subject": "Hello!",
            "body": "Hello, world!",
            "timestamp": "Jan 2 2020, 12:00 AM",
            "read": false,
            "archived": false
        },
        {
            "id": 95,
            "sender": "baz@example.com",
            "recipients": ["bar@example.com"],
            "subject": "Meeting Tomorrow",
            "body": "What time are we meeting?",
            "timestamp": "Jan 1 2020, 12:00 AM",
            "read": true,
            "archived": false
        }
    ]
#### Demonstration Video

https://github.com/nicolodijunior/mail/assets/101586266/67eda36b-be61-4a5b-a25c-e5bc176bbcbf


#### How to run the project

    0. Install Django
    run pip3 install Django in your terminal to install Django (you’ll also have to install pip)
    
    1. Clone the repository
    git clone [https://github.com/<username>/cs50w-network.git](https://github.com/nicolodijunior/mail.git)

    2. Navigate to the project directory
    cd mail

    3. Create database tables
    python manage.py makemigrations
    python manage.py migrate
    
    4. Run the server
    python manage.py runserver

    5. Open the application 
    In a browser, visit http://127.0.0.1:8000/

#### File structure

The project has a file structure similar to the Django Project structure:

    mail/: This directory contains the code for the social network application.
    mail/static/: This directory contains the static files for the project, such as CSS and JavaScript files.
    mail/templates/: This directory contains the HTML templates for the project.
    mail/models.py: This file contains the models for the project.
    mail/tests.py: This file contains the tests for the project.
    mail/urls.py: This file contains the URL routing for the project.
    mail/views.py: This file contains the views for the project.
    project3/settings.py: This file contains the project settings.
    project3/urls.py: This file contains the URL routing for the project.
    requirements.txt: This file contains the required Python packages for the project.

#### Additional notes

    The project is developed using Django v3.2.8 and Python v3.9.7.
