package com.virtualpairprogrammers;


import java.text.MessageFormat;


import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.types.DataTypes;

import com.mongodb.spark.MongoSpark;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;



public class MigrationExcel {

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
	                .config("spark.driver.bindAddress", "0.0.0.0")
	                .config("spark.mongodb.output.uri", mongodbUri)
	                .getOrCreate();
        // start a spark context
        
        
        // provide path to directory containing text files
        String files = "D:\\zomato-india-data-set\\*\\*.csv";
        
       // MongoDB connectionstring : mongodb+srv://dbAdmin:password54321@quickfoodcluster-zxbxk.azure.mongodb.net/test?retryWrites=true&w=majority   
      
        // read text files to RDD
        //JavaRDD<String> lines = sc.textFile(files);
        
        Dataset<Row> df = spark.read().format("csv")            
                .option("header", "true")                           
                .option("multiline", true)                          
                .option("sep", "|")                                 
                .option("quote", "\"")                               
                .option("dateFormat", "M/d/y")                      
                .option("inferSchema", true)                        
                //.load("D:\\zomato-india-data-set\\Agra\\*.csv") 
                 .csv(files);
        

		// save 
		//MongoSpark.save(df.write().option("collection", "airports").mode("append"));
		
		//MongoSpark.write(df).option("collection", "airports").mode("append").save();

		// Load the data from the "hundredClub" collection
		//MongoSpark.load(spark, ReadConfig.create(spark).withOption("collection", "airports"), Character.class).show();

         
        System.out.println("Excerpt of the dataframe content:");      
        df.show(50);      
        System.out.println("Dataframe's schema:"); 

        //System.out.println(df);  
        df.printSchema();   
        
   
       }  
    }