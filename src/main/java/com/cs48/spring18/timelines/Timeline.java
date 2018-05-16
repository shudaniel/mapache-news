package com.cs48.spring18.timelines;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;

/**
 * Created by afunk on 4/18/18.
 */
public class Timeline {
    private String timeline_id;
    private String name;
    private String description;
    ArrayList<Article> articles = new ArrayList<Article>();

    Timeline(){
        this.name = "";
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



    public void listArticles(){
        System.out.println(getName());
        System.out.println(getDescription());
        for(Article article : articles){
            String art_name = article.getName();
            String art_date = article.getDateString();
            String art_desc = article.getDescription();

            System.out.println();
            System.out.print(art_name + "\n" + art_date + "\n" + art_desc);
            System.out.println();
        }
        //Returns list of articles
    }

    public Date convertStringToDate(String dateString)
    {
        Date formatteddate = null;
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");

        try{
            formatteddate = df.parse(dateString);
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
