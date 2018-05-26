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

public class FirebaseFacade{

  private TimelineSaver timelineSaver;
  private ArticleSaver articleSaver;
  private DatabaseLoader loader;
  private DatabaseReference.CompletionListener listener;
  private SimpleArticleFactory factory;

  public FirebaseFacade(){
    try {

      //Use a different database for development vs production

      // FileInputStream serviceAccount = new FileInputStream("timelines-6d652-firebase-adminsdk-m2lpy-fc11e8e9c0.json");
      FileInputStream serviceAccount = new FileInputStream("timelines-dev-firebase-adminsdk-gbshw-83e10df814.json");
      FirebaseOptions options = new FirebaseOptions.Builder()
          .setCredentials(GoogleCredentials.fromStream(serviceAccount))
          .setDatabaseUrl("https://timelines-dev.firebaseio.com")
          // .setDatabaseUrl("https://timelines-6d652.firebaseio.com")
          .build();

      FirebaseApp.initializeApp(options);


    } catch  (IOException e){
      System.out.println("Invalid firebase connection");
    }

    loader = new DatabaseLoader();
    timelineSaver = new TimelineSaver(listener);
    articleSaver = new ArticleSaver(listener);
  }

  //Return a json of all timelines in the database
  public String getJson(){
    return loader.getJson();
  }

  //Save item as a timeline to the database
  public void save(Timeline item){
    timelineSaver.save(item);
  }

  //Create an Article and save into database to Timeline with corresonding timeline_id
  public void save(String timeline_id, String name, String link, String description, String date){
    factory = new ArticleFactory();
    HashMap<String, String> info = new HashMap<String, String>();
    info.put("name", name);
    info.put("link", link);
    info.put("image", "");
    info.put("description", description);
    
    Article item = factory.buildSingle(info, date);
    articleSaver.save(timeline_id, item, false);
  }

  //Save item as a Politifact Article to the Timeline with corresponding timeline_id
  public void save(String timeline_id, String url, String date){
    factory = new PolitifactFactory();
    HashMap<String, String> info = new HashMap<String, String>();
    info.put("url", url);
    Article item = factory.buildSingle(info, date);
    articleSaver.save(timeline_id, item, true);
  }

  public void generateArticles(String timeline_id, String query, String start, String end){
    factory = new ArticleFactory();
    query = query.replaceAll(" ", "%20");  //Remove white spaces
    String info = query + " " + start + " " + end;
    ArrayList<Article> articles = factory.buildList(info);
    articleSaver.save(timeline_id, articles, false);
  }

  public void generatePolitifactArticles(String timeline_id, String query){
    factory = new PolitifactFactory();
    ArrayList<Article> articles = factory.buildList(query);
    articleSaver.save(timeline_id, articles, true);
  }

  //Update Timeline in the database to match the item parameter
  public void update(Timeline item){
    timelineSaver.update(item);
  }

  //Delete Timeline in the database with corresponding timeline_id
  public void delete(String timeline_id){
    timelineSaver.delete(timeline_id);
  }

  //Delete Article in database with corresponding timeline_id and article_id
  public void delete(String timeline_id, String article_id){
    articleSaver.delete(timeline_id, article_id);
  }

  //Delete Politifact article in database
  public void delete(String timeline_id, String article_id, boolean isPolitifact){
    articleSaver.delete(timeline_id, article_id, isPolitifact);
  }
}