//Code taken from this spring-boot tutorial: 
//https://spring.io/guides/tutorials/react-and-spring-data-rest/
package com.cs48.spring18.timelines;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
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
  FirebaseFacade saver;

  public HomeController(){
    saver = new FirebaseFacade();
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
    @RequestParam(value="description", defaultValue="") String description,
	  @RequestParam(value="password", defaultValue="") String password
  ){
    Timeline newEntry = new Timeline(name, description, password);
    saver.save(newEntry);
  }

  //Update an existing Timeline in the database that matches the provided id
  @RequestMapping(value = "/update_timeline", method = RequestMethod.POST)
  public void updateTimeline(
    @RequestParam(value="timeline_id", defaultValue="") String id,
    @RequestParam(value="name", defaultValue="") String newName, 
    @RequestParam(value="description", defaultValue="") String newDescription,
    @RequestParam(value="password", defaultValue="") String password
  ){
    Timeline item = new Timeline(newName, newDescription);
    item.setId(id);
    saver.update(item);
  }

  //Delete an existing Timeline in the database that matches the provided it
  @RequestMapping(value = "/delete_timeline", method = RequestMethod.POST)
  public void deleteTimeline(@RequestParam(value="timeline_id", defaultValue="") String id){
    saver.delete(id);
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
    saver.save(timeline_id, name, link, description, date);
  }

  @RequestMapping(value = "/update_article", method = RequestMethod.POST)
  public void updateArticle(
      @RequestParam(value="timeline_id", defaultValue="") String timeline_id,
      @RequestParam(value="article_id", defaultValue="") String article_id,
      @RequestParam(value="name", defaultValue="") String name,
      @RequestParam(value="link", defaultValue="") String link,
      @RequestParam(value="description", defaultValue="") String description,
      @RequestParam(value="date", defaultValue="") String date,
      @RequestParam(value="politifact", defaultValue="") String politifact

    ){
    boolean isPolitifact = false;
    if(politifact.equals("true")){
      isPolitifact = true;
    }
    saver.update(timeline_id, article_id, name, link, description, date, isPolitifact);
  }


  @RequestMapping(value = "/generate", method = RequestMethod.POST)
  @ResponseBody
  public void generate(
    @RequestParam(value="timeline_id", defaultValue="") String id,
    @RequestParam(value="query", defaultValue="") String query
  ){
    saver.generateArticles(id, query);
  }

  //Precondition: An Article and Timeline exist in the database whose ids match the provided article_id and tiemline_id
  //The Article specified belongs to the Tiemeline specified
  //Postcondition: The article specified is deleted
  @RequestMapping(value = "/delete_article", method = RequestMethod.POST)
  public void deleteArticle(
    @RequestParam(value="timeline_id", defaultValue="") String timeline_id,
    @RequestParam(value="article_id", defaultValue="") String article_id
  ){
    System.out.println("timeline_id:" + timeline_id + "\narticle_id:" + article_id);
    saver.delete(timeline_id, article_id);
  }

  @RequestMapping(value = "/delete_politifact", method = RequestMethod.POST)
  public void deletePolitifactArticle(
    @RequestParam(value="timeline_id", defaultValue="") String timeline_id,
    @RequestParam(value="article_id", defaultValue="") String article_id
  ){
    System.out.println("timeline_id:" + timeline_id + "\narticle_id:" + article_id);
    saver.delete(timeline_id, article_id, true);
  }

  @RequestMapping(value = "/add_politifact", method = RequestMethod.POST)
  @ResponseBody
  public void addPolitifactArticle(
    @RequestParam(value="timeline_id", defaultValue="") String id,
    @RequestParam(value="link", defaultValue="") String url,
    @RequestParam(value="date", defaultValue="") String date
  ){
    System.out.println("id:" + id + "\nurl:" + url + "\ndate:" + date);
    saver.save(id, url, date);
  }

  @RequestMapping(value = "/politifact", method = RequestMethod.POST)
  @ResponseBody
  public void generatePolitifactList(
    @RequestParam(value="timeline_id", defaultValue="") String id,
    @RequestParam(value="query", defaultValue="") String query
  ){
    saver.generatePolitifactArticles(id, query);
  }




}