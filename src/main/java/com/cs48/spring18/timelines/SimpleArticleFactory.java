package com.cs48.spring18.timelines;

import java.util.ArrayList;
import java.util.HashMap;

public interface SimpleArticleFactory{

  public ArrayList<Article> buildList(String info);
  public Article buildSingle(HashMap<String,String> info, String date);
}