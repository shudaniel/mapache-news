package com.timelines.cs48.app;

import java.util.ArrayList;

/**
 * Created by afunk on 4/18/18.
 */
public class Timelines extends ArrayList<Timeline> {


    // Add TL to end
    public void addTimeline(Timeline t){
        this.add(t);
    }

    // Removes timeline by name
    public void removeTimeline(String name){
        for(Timeline t : this){
            if(t.getName() == name){
                this.remove(t);
            }
        }
    }

}
