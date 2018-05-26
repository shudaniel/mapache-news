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

public class TimelineSaver{

  private DatabaseReference.CompletionListener listener;

  public TimelineSaver(DatabaseReference.CompletionListener listener){
    this.listener = listener;
  }

  //Precondition: item is a timeline that is not in the database
  //Postcondition: Generate a unique id for item and save it into the database
  public void save(Timeline item){

    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/");

    DatabaseReference timelinesRef = ref.child("timelines");
    DatabaseReference pushedRef = timelinesRef.push();
    String postId = pushedRef.getKey(); //Generate a unique ID for item
    item.setId(postId);
    Map<String, Object> timelines = new HashMap<>();

    timelines.put(item.getId(), item);

    timelinesRef.updateChildren(timelines, listener);
    timelinesRef.orderByChild("name");
    
  }

  //Precondition: A timeline whose id matches the timeline_id in item exists in the database
  //Postcondition: The instance fields of the Timeline in the database get updated to match the parameter
  public void update(Timeline item){
    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/timelines/");
    DatabaseReference timelinesRef = ref.child(item.getId());
    Map<String, Object> timelineUpdates = new HashMap<>();

    timelineUpdates.put("name", item.getName());
    timelineUpdates.put("description", item.getDescription());
    timelineUpdates.put("password", item.getPassword());

    timelinesRef.updateChildren(timelineUpdates, listener);
    timelinesRef.orderByChild("name");
    
  }

  //Precondition: id is a valid id of a Timeline in the database
  //Postcondition: The timeline whose id matches the parameter is deleted from the database
  public void delete(String id){
    final FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref = database.getReference("/timelines/");
    ref.child(id).removeValue(listener);
  }
}