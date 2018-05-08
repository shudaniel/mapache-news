package com.timelines.cs48.app;
import java.util.ArrayList;
import java.text.*;
import java.util.*;

/**
 * Created by afunk on 4/18/18.
 */
public class Timeline {
    String name;
    String description;
    int id;
    // Keys keys;
    ArrayList<Article> articles = new ArrayList<Article>();

    static int timeline_count;

    Timeline(){
        this.name = "";
        this.description = "";
        timeline_count++;
        id = timeline_count;
    }

    Timeline(String name, String description){
      this.name = name;
      this.description = description;
      timeline_count++;
      id = timeline_count;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public int getId(){
        return id;
    }
    // Adds article at end of timeline
    public void addArticle(Article a){
        articles.add(a);
    }

    // Adds article at user-defined date
    public void addArticle(Article a, String date){
        //STUB : uses date-based sorting to insert the article at correct date
        a.setDate(date);
        articles.add(a);
        Collections.sort(articles);
    }

    public int getLength(){
        return articles.size();
    }



    public void listArticles(){
        //STUB

        for(Article article : articles){
            String art_name = article.getName();
            String art_date = article.getDate();
            String art_desc = article.getDescription(); //Maybe necessary -- might be too long for a list
            // String art_key = article.getKey();

        }
        //Returns list of articles
    }

    public Date convertStringToDate(String dateString)
    {
        Date formatteddate = null;
        DateFormat df = new SimpleDateFormat("dd-MMM-yyyy");

        try{
            formatteddate = df.parse(dateString);
//            formatteddate = df.format(dateA);
        }
        catch ( Exception ex ){
            System.out.println(ex);
        }
        return formatteddate;
    }



}
