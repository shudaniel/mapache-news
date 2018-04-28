package com.timelines.cs48.app;

import com.google.firebase.*;
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
          FileInputStream serviceAccount = new FileInputStream("src/main/java/com/timelines/cs48/app/timelines-6d652-firebase-adminsdk-m2lpy-4b6b1dbdbf.json");
          FirebaseOptions options = new FirebaseOptions.Builder()
              .setCredentials(GoogleCredentials.fromStream(serviceAccount))
              .setDatabaseUrl("https://timelines-6d652.firebaseio.com/")
              .build();

          FirebaseApp.initializeApp(options);


        } catch  (IOException e){
          System.out.println("Invalid firebase connection");
        }

        System.out.println( "Hello World!" );

    }
}
