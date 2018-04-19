import java.util.ArrayList;

/**
 * Created by afunk on 4/18/18.
 */
public class Keys extends ArrayList<Key> {

    public void addKey(Key key) {
        this.add(key);
    }

    //Remove key by color or name
    public void removeKey(String descriptor) {
        for (Key k : this) {
            if (k.getColor() == descriptor) {
                this.remove(k);
            } else if (k.getName() == descriptor) {
                this.remove(k);
            }
        }
    }

}

