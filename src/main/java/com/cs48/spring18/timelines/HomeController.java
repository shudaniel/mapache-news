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


@Controller
public class HomeController {

  FirebaseSave saver;

  public HomeController(){
    saver = new FirebaseSave();
    saver.loadAllTimelines();
  }

  @RequestMapping(value = "/")
  public String index() {
    return "index";
  }

  @RequestMapping(path = "/all", produces = "application/json; charset=UTF-8")
  @ResponseBody
  public String allTimelines() {
    return saver.getJson();
  }

  @RequestMapping(value = "/create", method = RequestMethod.POST)
  public void create(
    @RequestParam(value="name", defaultValue="") String name, 
    @RequestParam(value="description", defaultValue="") String description
  ){
    Timeline newEntry = new Timeline(name, description);
    saver.saveNewTimeline(newEntry);
  }

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

  @RequestMapping(value = "/delete_timeline", method = RequestMethod.POST)
  public void deleteTimeline(@RequestParam(value="timeline_id", defaultValue="") String id){
    saver.deleteTimeline(id);
  }

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

  

}