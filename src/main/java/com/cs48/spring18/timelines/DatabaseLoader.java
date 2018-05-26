package com.cs48.spring18.timelines;

import com.google.firebase.*;
import com.google.firebase.database.*;
import com.google.firebase.database.DatabaseReference.*;
import com.google.auth.oauth2.GoogleCredentials;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.codehaus.jackson.map.ObjectMapper;


public class DatabaseLoader{
  
  private String json;

  public DatabaseLoader(){
    json = "";
    loadDatabase();
  }

  //Return a string that represents a json of all timelines in the database
  public String getJson(){
    return json;
  }

  //Set the string that represents a json of all timelines in the database
  public void setJson(String json){
    this.json = json;
  }

  //Everytime our database is updated, this updates the json instance variable as well
  //Therefore, the front end will display up-to-date data with the backend
  private void loadDatabase(){
    // Get a reference to our posts
    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/");
    DatabaseReference timelinesRef = ref.child("timelines");
    timelinesRef.orderByChild("name");


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