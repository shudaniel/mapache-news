package com.cs48.spring18.timelines;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * Created by afunk on 4/18/18.
 */
public class Article implements Comparable<Article> {
    private String name;
    private String link;
    private String description;
    private String dateString; 
    private String imageUrl;
    private Date date;
    private Key key;
    private String article_id;


    Article(){
        name = "";
        link = "";
        description = "";
        imageUrl = "";
        dateString = "";
        article_id = "";
    }

    Article(String name, String link, String description, String imageUrl, String date){
        this.name = name;
        this.link = link;
        this.description = description;
        this.imageUrl = imageUrl;
        this.dateString = date;
        this.date = convertStringToDate(this.dateString);
        article_id = "";

    }

    Article(String name, String link, String description, String date){
        this.name = name;
        this.link = link;
        this.description = description;
        this.dateString = date;
        this.imageUrl = "";
        this.date = convertStringToDate(this.dateString);
        article_id = "";

    }

    Article(String name, String link, String description, String imageUrl, String date, Key key){
        this.name = name;
        this.link = link;
        this.description = description;
        this.imageUrl = imageUrl;
        this.dateString = date;
        this.key = key;
        this.article_id = "";

    }

    public String getId(){
        return article_id;
    }

    public void setId(String id){
        article_id = id;
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

    public String getImageUrl(){
        return imageUrl;
    }

    public void setImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
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
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");

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

    /*public String getKey(){
        return key.getColor() + " " + key.getName();
    }

    public void setKey(Key k){
        this.key = k;
    }
    */
}
