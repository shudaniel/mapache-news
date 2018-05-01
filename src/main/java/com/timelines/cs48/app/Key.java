<<<<<<< HEAD
package com.timelines.cs48.app;

=======
>>>>>>> 537665c8a2ce083245735d919018d5aee0219a7d
/**
 * Created by afunk on 4/18/18.
 */
import java.util.*;

public class Key {
    String name;
    String color;

    Key(){
        name = "";
        color = "";
    }

    Key(String name, String color){
        this.name = name;
        this.color = color;
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
}
