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




public class FirebaseSave{

  private String json;

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
  }

  public String getJson(){
    return json;
  }

  public void setJson(String json){
    this.json = json;
  }

  public void saveTimeline(Timeline item){

    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/");

    DatabaseReference timelinesRef = ref.child("timelines");
    DatabaseReference pushedRef = timelinesRef.push();
    String postId = pushedRef.getKey(); //Generate a unique ID for item
    item.setId(postId);
    Map<String, Object> timelines = new HashMap<>();


    timelines.put(item.getId(), item);


    timelinesRef.updateChildren(timelines, new DatabaseReference.CompletionListener() {

        @Override
        public void onComplete(DatabaseError de, DatabaseReference dr) {
          if (de != null) {
              System.out.println("Data could not be saved " + de.getMessage());
          } else {
              System.out.println("Data saved successfully.");
          }
        }
    });

    try{
      Thread.sleep(10000);
    }
    catch(InterruptedException e){
      System.out.println("Thread interrupted");
    }
  }

  public void saveArticle(String timeline_id, Article item){

    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/timelines/");

    DatabaseReference timelinesRef = (ref.child(timeline_id)).child("articles");
    DatabaseReference pushedRef = timelinesRef.push();
    String postId = pushedRef.getKey(); //Generate a unique ID for item
    item.setId(postId);
    Map<String, Object> article = new HashMap<>();
    article.put(item.getId(), item);


    timelinesRef.updateChildren(article, new DatabaseReference.CompletionListener() {

        @Override
        public void onComplete(DatabaseError de, DatabaseReference dr) {
          if (de != null) {
              System.out.println("Data could not be saved " + de.getMessage());
          } else {
              System.out.println("Data saved successfully.");
          }
        }
    });

    try{
      Thread.sleep(10000);
    }
    catch(InterruptedException e){
      System.out.println("Thread interrupted");
    }
  }

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