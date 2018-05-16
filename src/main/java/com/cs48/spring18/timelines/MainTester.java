package com.cs48.spring18.timelines;


/**
 * Created by afunk on 5/8/18.
 */
public class MainTester {
    public static void main(String []args){
        String description = "A timeline of the syrian conflict";
        String name = "Syria";
        Timeline syria = new Timeline(name, description);

        Article a1 = new Article("Syria Erases Palestine Camp","https://www.economist.com/news/middle-east-and-africa/21741578-regime-bashar-al-assad-may-redevelop-landfor-use-syrians-syria",
                "Article from Economist about Syrian crimes towards Palestinians","04-May-2018" );
        Article a2 = new Article("The road from Damascus", "https://www.economist.com/news/middle-east-and-africa/21740785-war-about-get-even-more-complicated-where-syrias-despot-bashar-al-assad",
                "Where Syria’s despot Bashar al-Assad is likely to strike next", "19-Apr-2018");
        Article a3 = new Article("The other Syrian conflict", "https://www.economist.com/news/middle-east-and-africa/21740471-conflict-between-two-powers-escalating-israel-determined-stop",
                "Israel is determined to stop Iran from establishing bases in Syria", "12-Apr-2018");

        syria.addArticle(a1);
        syria.addArticle(a2);
        syria.addArticle(a3);

        syria.listArticles();
    }
}
