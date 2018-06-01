- React and spring-boot tutorial: https://spring.io/guides/tutorials/react-and-spring-data-rest/
- This tutorial was used to get the code for the webpack.config.js and the package.json. It also helped teach us how to integrate our react front-end with the java backend.

## For Development Only (TAs ignore this part)
 - Run this on a separate terminal window at all times: `npm run-script watch`. 
 - If you do not, then the code changes will not update. This is also where some compiler errors will show.

## Required Tools
 - Java 1.8
 - Maven

## To Run

 - Make sure you have the JDK 1.8 installed and you have set the JAVA_HOME environment variable on your system to point to the JDK home directory.
 - Open a terminal window.
 **Note** Does not work on windows command prompt. Must be launched from Bash (unix shell).
 - If jdk is setup, then running `javac -version` should display version 1.8
 - To launch server, run: `./mvnw spring-boot:run`
 - Navigate to: localhost:8080
 
## How to Use
 - When you open the app, you are presented with two options to either create a new Timeline or to view all Timelines
 - If you choose to create a Timeline, you will be prompted to provide a name and a description. The name is required but the description is optional. There is also the option to set a Password for the Timeline. If a password is set, it will need to be entered before a user is allowed to edit or delete a Timeline. If a password is not set, then anyone is allowed to edit or delete the Timeline.
 - If the user is prompted for a password and the user correctly inputs it, the password is cached so the user will not have to repeatedly enter it.
 - If you choose to view all the Timelines, each one will be displayed with an option to View, Edit, or Delete. View allows you to see all articles a Timeline currently possesses. Edit will allow you to change the name and description of the Timeline. Delete will delete the Timeline from the database and all associated articles. 
 - If you choose to View a Timeline, the application will now display information about that Timeline. There are options to return to Home, Edit, or Delete. Edit and Delete function in the same way. 
 - There is an option to add an Article into a Timeline. The article form prompts the user for a name, url, date, and description of the article. The name, url, and date are required fields. The Articles in a Timeline will be sorted by this date. The description is shown when the cursor hovers over an article.
 - The user can click Generate Articles, which will ask the user for a query term and automatically generate articles based on that term.
 - If you choose to View Articles, then the system will display all the articles of a Timeline. Clicking on an article will open a new tab to that article's url. Clicking Delete will delete that article from the database. 
 - The User can click Add Single Politifact Article, which will prompt for a Politifact url and automatically generate an article based on the url.
 - The User can click Generate Politifact Articles and enter a query term, then it will automatically generate Politifact articles based on the term.
 - The User can edit the Name, Description, URL, and date of both Politifact and regular Articles.
 
## Deployed to Heroku
 - Our application has been deployed with heroku and can be found here: https://timelines-cs48.herokuapp.com/

 ## Known Bugs
 - It does not work on Internet Explorer or Microsoft Edge.
 - When system prompts for a password, if the user clicks cancel, it will still display "Invalid Password".
