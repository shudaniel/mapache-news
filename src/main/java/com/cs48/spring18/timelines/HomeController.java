//Code taken from this spring-boot tutorial: 
//https://spring.io/guides/tutorials/react-and-spring-data-rest/
package com.cs48.spring18.timelines;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


//This controller class is how the front end HTML/Javascript interacts with the backend Java


@Controller
public class HomeController {

  //This class uses the FirebaseSave class to take input from the front end and 
  //use it to save/edit/delete from the database
  FirebaseSave saver;

  public HomeController(){
    saver = new FirebaseSave();
    saver.loadAllTimelines();
  }

  //Returns index.html at relative url: "/"
  @RequestMapping(value = "/")
  public String index() {
    return "index";
  }

  //The json containing all timelines is placed here so the frontend can read it
  @RequestMapping(path = "/all", produces = "application/json; charset=UTF-8")
  @ResponseBody
  public String allTimelines() {
    return saver.getJson();
  }

  //When a post request is made, take the provided name and description and create
  //a Timeline in the database
  @RequestMapping(value = "/create", method = RequestMethod.POST)
  public void create(
    @RequestParam(value="name", defaultValue="") String name, 
    @RequestParam(value="description", defaultValue="") String description
  ){
    Timeline newEntry = new Timeline(name, description);
    saver.saveNewTimeline(newEntry);
  }

  //Update an existing Timeline in the database that matches the provided id
  @RequestMapping(value = "/update_timeline", method = RequestMethod.POST)
  public void updateTimeline(
    @RequestParam(value="timeline_id", defaultValue="") String id,
    @RequestParam(value="name", defaultValue="") String newName, 
    @RequestParam(value="description", defaultValue="") String newDescription
  ){
    Timeline item = new Timeline(newName, newDescription);
    item.setId(id);
    saver.updateTimeline(item);
  }

  //Delete an existing Timeline in the database that matches the provided it
  @RequestMapping(value = "/delete_timeline", method = RequestMethod.POST)
  public void deleteTimeline(@RequestParam(value="timeline_id", defaultValue="") String id){
    saver.deleteTimeline(id);
  }

  //Create an article in the database and add to the Timeline whose id matches the parameter id
  @RequestMapping(value = "/add_article", method = RequestMethod.POST)
  public void addArticle(
      @RequestParam(value="timeline_id", defaultValue="") String timeline_id,
      @RequestParam(value="name", defaultValue="") String name,
      @RequestParam(value="link", defaultValue="") String link,
      @RequestParam(value="description", defaultValue="") String description,
      @RequestParam(value="date", defaultValue="") String date
    ){
    //FORMAT: saver.saveArticle(timeline id, article)
    saver.saveNewArticle(timeline_id, new Article(name, link, description, date));
  }


  //Precondition: An Article and Timeline exist in the database whose ids match the provided article_id and tiemline_id
  //The Article specified belongs to the Tiemeline specified
  //Postcondition: The article specified is deleted
  @RequestMapping(value = "/delete_article", method = RequestMethod.POST)
  public void deleteArticle(
    @RequestParam(value="timeline_id", defaultValue="") String timeline_id,
    @RequestParam(value="article_id", defaultValue="") String article_id
  ){
    saver.deleteArticle(timeline_id, article_id);
  }


  

}