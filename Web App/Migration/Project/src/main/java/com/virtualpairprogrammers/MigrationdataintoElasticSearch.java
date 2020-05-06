package com.virtualpairprogrammers;

import static org.apache.spark.sql.functions.concat;
import static org.apache.spark.sql.functions.lit;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.functions;

import org.elasticsearch.hadoop.cfg.ConfigurationOptions;
import org.apache.spark.sql.types.*;

import static org.apache.spark.sql.functions.*;


public class MigrationdataintoElasticSearch {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		SparkSession spark = SparkSession
                .builder()
                .config(ConfigurationOptions.ES_NET_HTTP_AUTH_USER, "elastic")
                .config(ConfigurationOptions.ES_NET_HTTP_AUTH_PASS, "n0kdN3sCnq3Vey1R8wfMWeU0")
                .config(ConfigurationOptions.ES_NODES, "https://elastic:n0kdN3sCnq3Vey1R8wfMWeU0@17672b44a83a4910b086a10722b707c6.eastus2.azure.elastic-cloud.com/")
                .config(ConfigurationOptions.ES_PORT, "9243")
                .appName("Read JSON File to DataSet")
                .master("local[*]")
                .config("spark.driver.bindAddress", "0.0.0.0")
                //.config("spark.mongodb.output.uri", mongodbUri)
                .getOrCreate();
		
		String files = "D:\\zomato-india-data-set\\*\\*.csv";
		
		  Dataset<Row> df = spark.read().format("csv")            
	                .option("header", "true")                           
	                .option("multiline", true)                          
	                .option("sep", "|")                                 
	                .option("quote", "\"")                               
	                .option("dateFormat", "M/d/y")                      
	                .option("inferSchema", true)                        
	                //.load("D:\\zomato-india-data-set\\Agra\\*.csv") 
	                 .csv(files);
		  
		  String[] typeoffood = {"Apple Juice","Chicken Roast","Cheese Burger"};
	        
        
           
	        
	        Dataset<Row> newDs = 
     		        df.withColumn("userPassword" ,functions.lit("$2a$10$7WXOod2JkeP3TsgD.Dgzh.89fIk22T.X42LwLWUG9F5aVD5sLoDke")).
     		        withColumn("isRestaurant" ,functions.lit("True")).withColumn("userGender",functions.lit("MALE")).
     		        withColumn("userAge",functions.lit(27))
     		        .withColumn("userCountry",functions.lit("India"))
     		        .withColumn("userProfileImageUrl" ,functions.lit(null))
     		        .withColumn("typeOfFood",functions.lit(typeoffood))
     		        .withColumnRenamed("name","userName")
     		       .withColumn("file_name", functions.input_file_name())
     		        .withColumn("USEREMAIL",concat( functions.substring(functions.rand(),3,10).cast("String"),lit("@gmail.com")));
	        
	        
             
             newDs.show();	
             
             newDs.write()
             .format("org.elasticsearch.spark.sql")
             .option("es.nodes.wan.only","true")
             //. option("es.nodes","https://17672b44a83a4910b086a10722b707c6.eastus2.azure.elastic-cloud.com:9243")
             //.option("es.net.https.auth.user","elastic")
             //.option("es.net.https.auth.pass","nkdN3sCnq3Vey1R8wfMWeU0​​​​​​​")
           //.option("es.port", "9243")
           //.option("es.nodes", "https://17672b44a83a4910b086a10722b707c6.eastus2.azure.elastic-cloud.com")
           //.option("es.username","elastic")
           //.option("es.password", "nkdN3sCnq3Vey1R8wfMWeU0​​​​​​​")
             .mode("append")
             //.option("es.nodes.client.only", "false")
             .save("quickfoodata1/doc");
	}

}
