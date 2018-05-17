1. React and spring-boot tutorial: https://spring.io/guides/tutorials/react-and-spring-data-rest/

## For Development Only
 - Run this on a separate terminal window at all times: `npm run-script watch`. 
 - If you do not, then the code changes will not update. This is also where some compiler errors will show.

## Required Tools
 - Java 1.8

## To Run

 - You must relaunch the server to see a change
 - To launch server, do: `./mvnw spring-boot:run`
 - Navigate to: localhost:8080


 ## Known Bugs
 - When you edit a Timeline and click submit, the page sometimes won't refresh automatically, but the change was made in the database. You have to manually refresh to see it.
 - When you edit a Timeline from the view page, the current name and description aren't filled in as default values in the edit form.
 - When you create an article, you need to put http:// or else it won't link correctly.
 
