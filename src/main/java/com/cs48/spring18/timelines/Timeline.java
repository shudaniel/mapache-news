package com.cs48.spring18.timelines;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Map;
import java.util.HashMap;
import java.util.Collections;
import java.util.Date;

/**
 * Created by afunk on 4/18/18.
 */
public class Timeline {
    private String timeline_id;
    private String name;
    private String description;
    Map<String, Object> articles;

    Timeline(){
        this.name = "";
        this.description = "";
        timeline_id = ""; //This is set when saved into database
        articles = new HashMap<>();

    }

    Timeline(String name, String description){
        this.name = name;
        this.description = description;
        timeline_id = ""; //This is set when saved into database
        articles = new HashMap<>();

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
    // Precondition: Article a must a must already have an ID set
    // Postcondition: Add article a to the Timeline
    public void addArticle(Article a){
        articles.put(a.getId(), a);
    }

    public int getLength(){
        return articles.size();
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
