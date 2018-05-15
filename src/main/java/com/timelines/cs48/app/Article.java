package com.timelines.cs48.app;

import java.lang.String;
import java.util.Date;
import java.text.*;
import java.text.ParseException;
import java.awt.Color;


/**
 * Created by afunk on 4/18/18.
 */
public class Article implements Comparable<Article> {
    String name;
    String link;
    String description;
    String dateString;  // We should make a date class that can easily return and organize by date (or use an existing api)
    Date date;
    Key key;

    Article(){
        name = "";
        link = "";
        description = "";
        dateString = "";
    }

    Article(String name, String link, String description, String date){
        this.name = name;
        this.link = link;
        this.description = description;
        this.dateString = date;
        this.date = convertStringToDate(this.dateString);

    }

    Article(String name, String link, String description, String date, Key key){
        this.name = name;
        this.link = link;
        this.description = description;
        this.dateString = date;
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public String getDateString(){
        return dateString;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(String date) {
        this.dateString = date;
        this.date = convertStringToDate(dateString);
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
    @Override
    public int compareTo(Article o) {
        return getDate().compareTo(o.getDate());
    }

    public String getKey(){
        return key.getColor() + " " + key.getName();
    }
    
    public void setKey(Key k){
        this.key = k;
    }
}
