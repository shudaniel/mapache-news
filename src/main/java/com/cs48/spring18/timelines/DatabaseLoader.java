//This code came from this tutorial: https://spring.io/guides/tutorials/react-and-spring-data-rest/
package com.cs48.spring18.timelines;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

  private final TimelineRepository repository;

  @Autowired
  public DatabaseLoader(TimelineRepository repository) {
    this.repository = repository;
  }

  @Override
  public void run(String... strings) throws Exception {
    Timeline test = new Timeline("name", "description");
    this.repository.save(test);
  }
}