package com.cs48.spring18.timelines;


/**
 * Created by afunk on 4/18/18.
 */

public class Key {
    String name;
    String color;
    String description;

    //Creates a blank key
    Key(){
        name = "";
        color = "";
    }

    //If no description for key availible then use this constructor
    Key(String name, String color){
        this.name = name;
        this.color = color;
    }

    //Creates key with description, name, color
    Key(String name, String color, String description){
        this.name = name;
        this.color = color;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
