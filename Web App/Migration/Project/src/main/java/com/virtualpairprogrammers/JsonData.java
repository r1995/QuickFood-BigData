package com.virtualpairprogrammers;

import java.text.MessageFormat;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

import com.mongodb.spark.MongoSpark;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;

public class JsonData {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		//System.out.println("sdfdf");
		Config config = ConfigFactory.parseResources("app.conf");
		
		System.out.println(config);
		
		String mongodbUri = MessageFormat.format("mongodb://{0}:{1}/{2}.{3}", 
				config.getString("batch.db.host"),
				config.getString("batch.db.port"),
				config.getString("batch.db.database"), 
				config.getString("batch.db.collection"));
		
		System.out.println(mongodbUri);
			
		 // configure spark
        SparkSession spark = SparkSession
                .builder()
                .appName("Read JSON File to DataSet")
                .master("local[*]")
                .config("spark.driver.bindAddress", "127.0.0.1")
                .config("spark.mongodb.output.uri", mongodbUri)
                .getOrCreate();
        
          String jsonPath = "D:\\airports\\airports.json";
        
        // read JSON file to Dataset
        Dataset<Row> df = spark.read().option("multiline", true).json(jsonPath);
        df.printSchema();
        df.show();
        
        Dataset<Row> peopleDF =spark.read().option("multiline", true).json(jsonPath);
        
        //peopleDF.write().parquet("airports");
        
		// read parquet
		Dataset<Row> airportsDF = spark.read().parquet("airports");
		
		System.out.println(airportsDF);
		
		// save airports
		MongoSpark.save(airportsDF.write().option("collection", "airports").mode("append"));
		
		//MongoSpark.write(airportsDF).option("collection", "airports").mode("overwrite").save();

		// Load the data from the "hundredClub" collection
		//MongoSpark.load(spark, ReadConfig.create(spark).withOption("collection", "airports"), Character.class).show();

		spark.stop();
	

  
       
    }
}

