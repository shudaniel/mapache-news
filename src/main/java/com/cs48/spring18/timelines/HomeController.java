//Code taken from this spring-boot tutorial: 
//https://spring.io/guides/tutorials/react-and-spring-data-rest/
package com.cs48.spring18.timelines;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@Controller
public class HomeController {

  @RequestMapping(value = "/")
  public String index() {
    return "index";
  }

}