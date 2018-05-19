package com.cs48.spring18.timelines;


import java.io.InputStreamReader;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import com.google.gson.*;
import java.util.Map;
import java.io.IOException;
import java.util.ArrayList;
import java.net.MalformedURLException;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;




public class ArticleGenerator{

  //Returns an Arraylist of Articles that were parsed from the url
  //Precondition: The url is a json from News API
  //Postcondition: Creates an arraylist of Articles 
  public static ArrayList<Article> generateArticles(String string_url){

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
      JsonArray data = rootobj.getAsJsonArray("articles");

      for(JsonElement entry : data){
        JsonObject post = entry.getAsJsonObject();

          String name = post.get("title").getAsString();
          String description = post.get("description").getAsString();
          String link = post.get("url").getAsString();
          String date = post.get("publishedAt").getAsString();

          date = date.substring(0,10);

          articles.add(new Article(name, link, description, date));
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
}