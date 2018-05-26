package com.cs48.spring18.timelines;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.*;
import java.net.URLEncoder;
import java.util.*;
import java.text.SimpleDateFormat;
import java.text.DateFormat;
import java.text.ParseException;


public class PolitifactFactory implements SimpleArticleFactory{

  public ArrayList<Article> build(String query){
    ArrayList<Article> politifact = new ArrayList<Article>();

    WebClient client = new WebClient();  
    client.getOptions().setCssEnabled(false);  
    client.getOptions().setJavaScriptEnabled(false);  
    try {  
      String url = "http://www.politifact.com/search/?q=" + URLEncoder.encode(query, "UTF-8");
      HtmlPage page = client.getPage(url);
      List<HtmlElement> items = (List<HtmlElement>) page.getByXPath("//li[@class='search-results__item']") ;  

      for(HtmlElement item : items){  
        HtmlAnchor itemAnchor =  ((HtmlAnchor) item.getFirstByXPath(".//a"));

        String name = itemAnchor.asText();
        String link = "http://www.politifact.com" +  itemAnchor.getHrefAttribute() ;
        String date =((HtmlElement) item.getFirstByXPath(".//strong")).asText() ;
        date = dateParser(date);

        //It is possible that not all results have a truth-o-meter
        HtmlImage truthOMeter = item.getFirstByXPath(".//img") ;
        String image = truthOMeter == null ? "" : truthOMeter.getSrcAttribute() ;

        politifact.add(new Article(name, link, "", image, date));
      }
    }catch(Exception e){
      e.printStackTrace();
    }

    return politifact;

  
  }

  private String dateParser(String string_date){
    String dateString = "";
    try{
      DateFormat old_format = new SimpleDateFormat("MMMMM dd, yyyy");
      DateFormat new_format = new SimpleDateFormat("MM-dd-yyyy");

      Date date = old_format.parse(string_date);
      dateString = new_format.format(date);
    }
    catch(ParseException e){
      e.printStackTrace();
    }

    return dateString;
  }

}