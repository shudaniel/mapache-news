/**
 * Created by afunk on 4/18/18.
 */
public class Article {
    String name;
    String link;
    String description;
    String date; // We should make a date class that can easily return and organize by date (or use an existing api)
    Key key;

    Article(){
        name = "";
        link = "";
        description = "";
        date = "";
    }

    Article(String name, String link, String description, String date){
        this.name = name;
        this.link = link;
        this.description = description;
        this.date = date;
    }

    Article(String name, String link, String description, String date, Key key){
        this.name = name;
        this.link = link;
        this.description = description;
        this.date = date;
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getKey(){
        return key.getColor() + " " + key.getName();
    }
    
    public void setKey(Key k){
        this.key = k;
    }
}
