package com.timelines.cs48.app;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args ) 
    {
        System.out.println( "Hello World!" );
        
        FirebaseSave saver = new FirebaseSave();
        Timeline test = new Timeline("Test1", "The best description ever");
        saver.saveTimeline(test);
        System.out.println( "Goodbye World!" );

    }
}
