package com.cs48.spring18.timelines;
import java.util.ArrayList;
import java.text.*;
import java.util.*;

/**
 * Created by afunk on 4/18/18.
 */


public class Timeline {

    private String name;
    private String description;

    //The id above is needed to prevent compiler error
    //Need this second id variable because the one above isn't saved to firebase
    private String timeline_id;

    ArrayList<Article> articles = new ArrayList<Article>();

    Timeline(){
        this.name = "";
        this.description = "";
        timeline_id = ""; //This is set when saved into database
    }

    Timeline(String name){
        this.name = name;
        this.description = "";
        timeline_id = ""; //This is set when saved into database
    }

    Timeline(String name, String description){
      this.name = name;
      this.description = description;
      timeline_id = ""; //This is set when saved into database
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

    public String getId(){
        return timeline_id;
    }
    public void setId(String id){
        timeline_id = id;
    }
    // Adds article at end of timeline
    public void addArticle(Article a){
        articles.add(a);
        Collections.sort(articles);
    }

    // Adds article at user-defined date
    public void addArticle(Article a, String date){
        a.setDate(date);
        articles.add(a);
        Collections.sort(articles);
    }

    public int getLength(){
        return articles.size();
    }



    // public void listArticles(){
    //     System.out.println(getName());
    //     System.out.println(getDescription());
    //     for(Article article : articles){
    //         String art_name = article.getName();
    //         String art_date = article.getDateString();
    //         String art_desc = article.getDescription();

    //         System.out.print(art_name + " " + art_date + " " + art_desc);
    //         System.out.println();
    //     }
    //     //Returns list of articles
    // }

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

    @Override
    public String toString() {
        return "Timeline{" +
                "id=" + timeline_id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                '}';
    }



}
