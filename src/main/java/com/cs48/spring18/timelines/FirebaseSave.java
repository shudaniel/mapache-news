package com.cs48.spring18.timelines;

import com.google.firebase.*;
import com.google.firebase.database.*;
import com.google.firebase.database.DatabaseReference.*;
import com.google.auth.oauth2.GoogleCredentials;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.codehaus.jackson.map.ObjectMapper;

//This class is how the backend interacts with our database


public class FirebaseSave{


   //This  string is json format of all timelines in our database. 
  //This will be passed to the front end ti read from
  private String json;
  private DatabaseReference.CompletionListener listener;

  //The constructor sets up the connection to our Firebase database based on the sdk file in the root
  public FirebaseSave(){
    try {
      FileInputStream serviceAccount = new FileInputStream("timelines-6d652-firebase-adminsdk-m2lpy-fc11e8e9c0.json");
      FirebaseOptions options = new FirebaseOptions.Builder()
          .setCredentials(GoogleCredentials.fromStream(serviceAccount))
          .setDatabaseUrl("https://timelines-6d652.firebaseio.com")
          .build();

      FirebaseApp.initializeApp(options);


    } catch  (IOException e){
      System.out.println("Invalid firebase connection");
    }

    json = "";
    listener = new DatabaseReference.CompletionListener() {

        @Override
        public void onComplete(DatabaseError de, DatabaseReference dr) {
          if (de != null) {
              System.out.println("Data could not be updated " + de.getMessage());
          } else {
              System.out.println("Data updated successfully.");
          }
        }
    };
  }

  //Return a string that represents a json of all timelines in the database
  public String getJson(){
    return json;
  }

  //Set the string that represents a json of all timelines in the database
  public void setJson(String json){
    this.json = json;
  }

  //Precondition: item is a timeline that is not in the database
  //Postcondition: Generate a unique id for item and save it into the database
  public void saveNewTimeline(Timeline item){

    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/");

    DatabaseReference timelinesRef = ref.child("timelines");
    DatabaseReference pushedRef = timelinesRef.push();
    String postId = pushedRef.getKey(); //Generate a unique ID for item
    item.setId(postId);
    Map<String, Object> timelines = new HashMap<>();


    timelines.put(item.getId(), item);


    timelinesRef.updateChildren(timelines, listener);

    try{
      Thread.sleep(10000);
    }
    catch(InterruptedException e){
      System.out.println("Thread interrupted");
    }
  }

  //Precondition: A timeline whose id matches the timeline_id in item exists in the database
  //Postcondition: The instance fields of the Timeline in the database get updated to match the parameter
  public void updateTimeline(Timeline item){
    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/timelines/");
    DatabaseReference timelinesRef = ref.child(item.getId());
    Map<String, Object> timelineUpdates = new HashMap<>();

    timelineUpdates.put("name", item.getName());
    timelineUpdates.put("description", item.getDescription());

    timelinesRef.updateChildren(timelineUpdates, listener);

    try{
      Thread.sleep(10000);
    }
    catch(InterruptedException e){
      System.out.println("Thread interrupted");
    }

  }

  //Precondition: id is a valid id of a Timeline in the database
  //Postcondition: The timeline whose id matches the parameter is deleted from the database
  public void deleteTimeline(String id){
    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/timelines/");
    ref.child(id).removeValue(listener);
  }


  //Precondition: There is an existing Timeline with an id matching timeline_id
  //Postcondition: A new Article, item, is saved in the database and belongs to corresponding timeline
  public void saveNewArticle(String timeline_id, Article item){

    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/timelines/");

    DatabaseReference timelinesRef = (ref.child(timeline_id)).child("articles");
    DatabaseReference pushedRef = timelinesRef.push();
    String postId = pushedRef.getKey(); //Generate a unique ID for item
    item.setId(postId);
    Map<String, Object> article = new HashMap<>();
    article.put(item.getId(), item);


    timelinesRef.updateChildren(article, listener);

    try{
      Thread.sleep(10000);
    }
    catch(InterruptedException e){
      System.out.println("Thread interrupted");
    }
  }

  //Precondition: timeline_id is the id of a Timeline in the database
  // This timeline has an article with an id that matches article_id
  //Postcondition: The article that matches article_id will be deleted from the timeline whose id matches timeline_id
  public void deleteArticle(String timeline_id, String article_id){
    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/timelines/" + timeline_id + "/articles/");
    ref.child(article_id).removeValue(listener);
  }

  //Everytime our database is updated, this updates the json instance variable as well
  //Therefore, the front end will display up-to-date data with the backend
  public void loadAllTimelines(){
    // Get a reference to our posts
    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/");
    DatabaseReference timelinesRef = ref.child("timelines");

    // Attach a listener to read the data at our posts reference
    ref.addValueEventListener(new ValueEventListener() {
      @Override
      public void onDataChange(DataSnapshot dataSnapshot) {
        //Print out all timelines to console
        ObjectMapper mapperObj = new ObjectMapper();
        Map<String, Object> post = (Map<String, Object>) dataSnapshot.getValue();
        
        //Convert this map into a json format to be read by the frontend
        try {
          String jsonResp = mapperObj.writeValueAsString(post);
          System.out.println(jsonResp);
          setJson(jsonResp);

        } catch (IOException e) {
          e.printStackTrace();
        }
      }

      @Override
      public void onCancelled(DatabaseError databaseError) {
        System.out.println("The read failed: " + databaseError.getCode());

      }
    });

  }

}