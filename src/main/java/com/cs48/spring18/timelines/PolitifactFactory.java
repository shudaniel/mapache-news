package com.cs48.spring18.timelines;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebRequest;
import com.gargoylesoftware.htmlunit.html.*;
import java.net.URLEncoder;
import java.net.URL;
import java.util.*;
import java.text.SimpleDateFormat;
import java.text.DateFormat;
import java.text.ParseException;


public class PolitifactFactory implements SimpleArticleFactory{

  public ArrayList<Article> buildList(String query){
    ArrayList<Article> politifact = new ArrayList<Article>();

    WebClient client = new WebClient();  
    client.getOptions().setCssEnabled(false);  
    client.getOptions().setJavaScriptEnabled(false);  

    try {  
      String url = "http://www.politifact.com/search/?q=" + URLEncoder.encode(query, "UTF-8");

      HtmlPage page = client.getPage(url);
      List<HtmlElement> items = (List<HtmlElement>) page.getByXPath("//li[@class='search-results__item']") ;  

      for(HtmlElement item : items){  

        HtmlAnchor itemAnchor =  ((HtmlAnchor) item.getFirstByXPath(".//a[@class='search-results__link link']"));
        String name = itemAnchor.asText();
        String link = "http://www.politifact.com" +  itemAnchor.getHrefAttribute() ;
        String date =((HtmlElement) item.getFirstByXPath(".//strong")).asText() ;
        date = dateParser(date);

        //It is possible that not all results have a truth-o-meter
        HtmlImage truthOMeter = item.getFirstByXPath(".//img") ;
        String image = "";
        if(truthOMeter != null){
          image = truthOMeter.getSrcAttribute();

          //If the truth-o-meter is not null, than this is a quote with a speaker
          HtmlElement speaker =((HtmlElement) item.getFirstByXPath(".//p"));
          if(speaker != null){
            name = name + "\n" + speaker.asText();
          }
        }

        politifact.add(new Article(name, link, "", image, date));
      }
    }catch(Exception e){
      e.printStackTrace();
    }

    return politifact;

  
  }

  public Article buildSingle(HashMap<String, String> info, String date){
    String url = info.get("link");
    String name = "";
    String description = "";
    String image = "";


    WebClient client = new WebClient();  
    client.getOptions().setCssEnabled(false);  
    client.getOptions().setJavaScriptEnabled(false);  

    try {  
      HtmlPage page = client.getPage(url);
      name = ((HtmlElement) page.getFirstByXPath(".//h1[@class='article__title']")).asText();
      HtmlDivision meter =  page.getFirstByXPath(".//div[@class='meter']");
      if(meter != null){
        //This article has a truth-o-meter
        image = ((HtmlImage)(meter.getFirstByXPath(".//img"))).getSrcAttribute();
      }
    }catch(Exception e){
      name = "The page at: " + url + " does not exist";
      url = "http://www.politifact.com/thispagedoesnotexist/";
      return new Article(name, url, description, image, date);
      // e.printStackTrace();
    }

    Article item = new Article(name, url, description, image, date);
    return item;
  }

  private String dateParser(String string_date){
    String dateString = "";
    try{
      DateFormat old_format = new SimpleDateFormat("MMMMM dd, yyyy");
      DateFormat new_format = new SimpleDateFormat("yyyy-MM-dd");

      Date date = old_format.parse(string_date);
      dateString = new_format.format(date);
    }
    catch(ParseException e){
      e.printStackTrace();
    }

    return dateString;
  }

}