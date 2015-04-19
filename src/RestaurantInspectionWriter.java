import java.util.Arrays;

import org.bson.Document;

import com.mongodb.DB;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class RestaurantInspectionWriter {
	public static void main(String args[]) {
        MongoCredential credential = MongoCredential.createCredential("user", "avenavi", "CocaColacherry".toCharArray());
        MongoClient mongoClient = new MongoClient(new ServerAddress("ds035250.mongolab.com", 35250), Arrays.asList(credential));
        MongoDatabase db = mongoClient.getDatabase("avenavi");
        MongoCollection<Document> collection = db.getCollection("stores");
        Document myDoc = collection.find().first();
        System.out.println(myDoc.toJson());
	}
}