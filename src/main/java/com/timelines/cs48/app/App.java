package com.timelines.cs48.app;

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

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) 
    {
        System.out.println( "Hello World!" );
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

        final FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("/");

        DatabaseReference timelinesRef = ref.child("timelines");

        Map<String, Timeline> timelines = new HashMap<>();
        timelines.put("1", new Timeline("Test1", "The best description ever"));
        timelines.put("2", new Timeline("Test2", "An even better test description"));


        timelinesRef.setValue(timelines, new DatabaseReference.CompletionListener() {

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
          System.out.println("FAILED TO SLEEP");
        }
        System.out.println( "Goodbye World!" );

    }
}
