1. React and spring-boot tutorial: https://spring.io/guides/tutorials/react-and-spring-data-rest/

## To Run

 - Run this on a separate terminal window at all times: npm run-script watch. If you do not, then the code changes will not update. This is also where compiler errors will show.
 - You must relaunch the server everytime you make a change (sorry I don't know how to change this)
 - To launch server, do: ./mvnw spring-boot:run
 - Don't forget to manually add this: timelines-6d652-firebase-adminsdk-m2lpy-fc11e8e9c0.json into the root directory.
 - All CSS is located here: //timelines/src/main/resources/static
 - For some reason, React components cannot import CSS the normal way. So I put it all in this one file.


 ## Known Bugs
 - When you edit a Timeline from the homepage and click submit, the page won't refresh automatically, but the change was made in the database. You have to manually refresh to see it.
 - When you edit a Timeline from the view page, you have to return to the homepage and click on the view button again to see the change.
 - When you create an article, you need to put http:// or else it won't link correctly.
 