package com.cs48.spring18.timelines;

import java.util.ArrayList;

public interface SimpleArticleFactory{

  public ArrayList<Article> build(String info);
  
}