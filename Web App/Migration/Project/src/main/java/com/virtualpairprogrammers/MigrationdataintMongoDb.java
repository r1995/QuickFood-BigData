package com.virtualpairprogrammers;

import java.io.BufferedReader;
import java.io.File;
import java.text.MessageFormat;
import org.apache.spark.api.java.JavaSparkContext;

import static org.apache.spark.sql.functions.split;

import java.util.*;

import org.apache.spark.sql.Column;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoder;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.functions;
import org.apache.spark.sql.types.DataTypes;

import com.mongodb.MongoClient;
import com.mongodb.MongoClientURI;
import com.mongodb.spark.MongoSpark;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;



import static org.apache.spark.sql.functions.*;




public class MigrationdataintMongoDb {
	

	public static void main(String[] args)  {
		// TODO Auto-generated method stub
		  
				//System.out.println("sdfdf");
				//Config config = ConfigFactory.parseResources("app.conf");
				
				//System.out.println(config);
				
				
				
				//String mongodbUri = MessageFormat.format("mongodb://{0}:{1}/{2}.{3}\"", 
					//	config.getString("batch.db.host"),
				      //  config.getString("batch.db.port"),
					//	config.getString("batch.db.database"), 
					//	config.getString("batch.db.collection"));
				

				// configure spark
				 SparkSession spark = SparkSession
			                .builder()
			                .appName("Read JSON File to DataSet")
			                .master("local[*]")
			                .config("spark.driver.bindAddress", "0.0.0.0")
			                .config("spark.mongodb.output.uri","mongodb://dbAdmin:password54321@quickfoodcluster-shard-00-00-zxbxk.azure.mongodb.net:27017,quickfoodcluster-shard-00-01-zxbxk.azure.mongodb.net:27017,quickfoodcluster-shard-00-02-zxbxk.azure.mongodb.net:27017/test?authSource=admin&replicaSet=QuickFoodCluster-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true")
                            .getOrCreate();
		        // start a spark context
				 
				 spark.sparkContext().setLogLevel("ERROR");
				 
			
				 
		        
				  String files = "D:\\zomato-india-data-set\\*\\*.csv";
		       
		     
		        //System.out.println(files);
	
		        
		        
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
		        //df.show();


		        
		        String[] typeoffood = {"Apple Juice","Chicken Roast","Cheese Burger"};
		        

		       // Random objGenerator = new Random();
		        //int randomNumber = 0;
		        //for (int iCount = 0; iCount< df.count(); iCount++){
		        	//randomNumber = objGenerator.nextInt(1000000000);
		        	
	              //System.out.println( randomNumber+"@gmail.com");  
	              
	           // }	        
		        
		       
	            
		        
		        Dataset<Row> newDs = 
	      		        df.withColumn("userPassword" ,functions.lit("$2a$10$7WXOod2JkeP3TsgD.Dgzh.89fIk22T.X42LwLWUG9F5aVD5sLoDke"))
	      		        .withColumn("isRestaurant" ,functions.lit("True")).withColumn("userGender",functions.lit("MALE")).
	      		        withColumn("userAge",functions.lit(27))
	      		        .withColumn("userCountry",functions.lit("India"))
	      		        .withColumn("userProfileImageUrl" ,functions.lit(null))
	      		        .withColumn("typeOfFood",functions.lit(typeoffood))
	      		        .withColumnRenamed("name","userName")
	      		        //.withColumn("file_name",  functions.split(functions.input_file_name(), "//").getItem(7).cast("String"))
	      		        .withColumn("file_name", functions.input_file_name())
	      		       .withColumn("USEREMAIL",concat( functions.substring(functions.rand(),3,10).cast("String"),lit("@gmail.com")));
		        
		        
	              
	              newDs.show();	
	              
	              
	              
	         	
	             
				// save 
				MongoSpark.save(newDs.write().option("collection", "quickfood").mode("append"));
				
				//MongoSpark.write(df).option("collection", "airports").mode("append").save();

				// Load the data from the "hundredClub" collection
				//MongoSpark.load(spark, ReadConfig.create(spark).withOption("collection", "airports"), Character.class).show();

		         
		        //System.out.println("Excerpt of the dataframe content:");      
		        //df.show(50);      
		        //System.out.println("Dataframe's schema:"); 

		        //System.out.println(df);  
		        //df.printSchema();   
		        
		   
		       }


	
		    }
