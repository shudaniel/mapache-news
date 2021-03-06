package com.cs48.spring18.timelines;


import java.io.InputStreamReader;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import com.google.gson.*;
import java.util.Map;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.net.MalformedURLException;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;


public class ArticleFactory implements SimpleArticleFactory{

  private static final String NEWS_API_KEY = "70e77920c76840b0805076533088e5e7";

  //Returns an Arraylist of Articles that were parsed from the url
  //Precondition: The start and end are dates in the form YYYY-MM-DD
  // The only whitespaces in parameter are to mark separation between the query, start-date, and end-date all 
  //Postcondition: Creates and returns an arraylist of Articles 
  public ArrayList<Article> buildList(String query){

    String string_url = "https://newsapi.org/v2/top-headlines?q=" + query + "&sortBy=popularity&apiKey=" + NEWS_API_KEY;
    System.out.println(string_url);
    ArrayList<Article> articles = new ArrayList<Article>();

    // Connect to the URL using java's native library
    try{
      URL url = new URL(string_url);
      URLConnection request = url.openConnection();
      request.connect();

      // Convert to a JSON object
      JsonParser jp = new JsonParser(); 
      JsonElement root = jp.parse(new InputStreamReader((InputStream) request.getContent())); //Convert the input stream to a json element
      JsonObject rootobj = root.getAsJsonObject();  
      int numResults = rootobj.get("totalResults").getAsInt();
      JsonArray data = rootobj.getAsJsonArray("articles");
      jsonToArrayList(articles, data);

      //If there are not that many headlines from the top-headlines category, grab articles from the everyting categorty
      if(numResults < 5){
        string_url = "https://newsapi.org/v2/everything?q=" + query + "&sortBy=popularity&language=en&apiKey=" + NEWS_API_KEY;
        System.out.println(string_url);

        URL url2 = new URL(string_url);

        URLConnection request2 = url2.openConnection();
        request2.connect();
        jp = new JsonParser(); 
        root = jp.parse(new InputStreamReader((InputStream) request2.getContent())); //Convert the input stream to a json element
        rootobj = root.getAsJsonObject();  
        data = rootobj.getAsJsonArray("articles");
        jsonToArrayList(articles, data);
      }


    }
    catch(MalformedURLException e){
      System.out.println("Malformed URL");
      // e.printStackTrace();
    }
    catch(IOException e){
      System.out.println("IO Exception");
      e.printStackTrace();
    }

    return articles;

  }

  //Create a single Article
  public Article buildSingle(HashMap<String,String> info, String date){

    String name = info.get("name");
    String link = info.get("link");
    String description = info.get("description");
    String image = info.get("image");

    return new Article(name, link, description, image, date);
    
  }

  //Move the information from data into Articles and add them to the Arraylist
  private void jsonToArrayList(ArrayList<Article> articles, JsonArray data){
    String name, description, link, date, image;

    for(JsonElement entry : data){
      JsonObject post = entry.getAsJsonObject();
      if(post.get("title").isJsonNull()){
        name = "";
      }
      else{
        name = post.get("title").getAsString();
      }

      if(post.get("description").isJsonNull()){
        description = "";
      }
      else{
        description = post.get("description").getAsString();
      }

      if(post.get("url").isJsonNull()){
        link = "";
      }
      else{
        link = post.get("url").getAsString();
      }

      if(post.get("publishedAt").isJsonNull()){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date now = new Date();
        date = sdf.format(now);
      }
      else{
        date = post.get("publishedAt").getAsString();
        date = date.substring(0,10);
      }

      if(post.get("urlToImage").isJsonNull()){
        image = "";
      }
      else{
        image = post.get("urlToImage").getAsString();
      }
      

      articles.add(new Article(name, link, description, image, date));
    }
  }
}