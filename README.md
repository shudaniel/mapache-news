1. React and spring-boot tutorial: https://spring.io/guides/tutorials/react-and-spring-data-rest/



## To Run

 - Open a separate terminal window and run: `npm run-script watch`. 
 - If you do not, then the code changes will not update. This is also where compiler errors will show.
 - You must relaunch the server everytime you make a change (sorry I don't know how to change this)
 - To launch server, do: `./mvnw spring-boot:run`
 - Don't forget to manually add this to root directory: timelines-6d652-firebase-adminsdk-m2lpy-fc11e8e9c0.json



 ## Known Bugs
 - When you edit a Timeline and click submit, the page won't refresh automatically, but the change was made in the database. You have to manually refresh to see it.
 - When you edit a Timeline from the view page, the current name and description aren't filled in as default values in the edit form.
 - When you create an article, you need to put http:// or else it won't link correctly.
 