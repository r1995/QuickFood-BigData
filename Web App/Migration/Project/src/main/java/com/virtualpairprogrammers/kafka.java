package com.virtualpairprogrammers;


import java.util.HashMap;
import java.util.HashSet;

import static org.apache.spark.sql.functions.concat;
import static org.apache.spark.sql.functions.lit;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Collections;
import java.util.Currency;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;
import java.util.regex.Pattern;
import java.io.Serializable;

import scala.Tuple2;

import kafka.serializer.StringDecoder;

import org.apache.spark.SparkConf;
import org.apache.spark.SparkContext;
import org.apache.spark.api.java.JavaPairRDD;
import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.*;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.DataFrameNaFunctions;
import org.apache.spark.sql.functions;
import org.apache.spark.streaming.api.java.*;
import org.apache.spark.streaming.kafka.HasOffsetRanges;
import org.apache.spark.streaming.kafka.KafkaUtils;
import org.apache.spark.streaming.kafka.OffsetRange;
import org.json.JSONObject;
import org.omg.CORBA.Current;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.Durations;
import org.apache.spark.sql.SQLContext;

import org.apache.spark.sql.RowFactory;
import org.apache.spark.sql.types.DataTypes;
import org.apache.spark.sql.types.StructField;
import org.apache.spark.sql.types.StructType;

import org.apache.spark.api.java.JavaRDD;
import org.apache.spark.api.java.function.Function;
import org.apache.spark.api.java.function.MapFunction;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.Encoder;
import org.apache.spark.sql.Encoders;

import java.io.Serializable;

import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Encoder;
import org.apache.spark.sql.Encoders;
import org.apache.spark.sql.SparkSession;


import org.elasticsearch.hadoop.cfg.ConfigurationOptions;

import static org.apache.spark.sql.functions.split;

import static org.apache.spark.sql.functions.col;

public class kafka {
	
	

	public static void main(String[] args) throws InterruptedException {
		// TODO Auto-generated method stub

		
		
		 SparkConf sparkConf = new SparkConf().setAppName("JavaKafkaWordCount11").setMaster("local[*]").set("spark.driver.bindAddress", "0.0.0.0");
				 
         

         // Create the context with 2 seconds batch size
      // Create the context with 2 seconds batch size
         JavaStreamingContext jssc = new JavaStreamingContext(sparkConf, Durations.seconds(1));

         Map<String, String> kafkaParams = new HashMap<>();
         kafkaParams.put("metadata.broker.list", "localhost:9092");
         

         System.out.println(kafkaParams);

         Set<String> topics = Collections.singleton("test");
         

         System.out.println(topics);
         

         JavaPairInputDStream<String, String> directKafkaStream = KafkaUtils.createDirectStream(jssc,
                 String.class, String.class, StringDecoder.class, StringDecoder.class, kafkaParams, topics);

         

         System.out.println(directKafkaStream);
         
         JavaDStream<String> lines = directKafkaStream.map(new Function<Tuple2<String, String>, String>() {
             @Override
             public String call(Tuple2<String, String> tuple2) {
                 return tuple2._2();  
               
             }
         });
         
         System.out.println(lines);
         
         lines.foreachRDD(rdd -> {

             if (rdd.count() > 0) {
                 List<String> strArray = rdd.collect();

                System.out.println(strArray);
                
                SparkSession spark = Javasparksessionsingleton.getInstance(rdd.context().getConf());
                
            
                JavaRDD<KafkaConsumer1> rowRDD = rdd.map(word -> {
                	KafkaConsumer1 record = new KafkaConsumer1();
              	    record.setWord(word);
              	    return record;
              	  });
                
               
                
                System.out.println(rowRDD);
             
                
                Dataset<Row> wordsDataFrame = spark.createDataFrame(rowRDD, KafkaConsumer1.class);

                wordsDataFrame.createOrReplaceTempView("words");
                
                Dataset<Row> wordCountsDataFrame =
                        spark.sql("select word from words ");
                    System.out.println("=========  =========");
                    wordCountsDataFrame.show();
                
                    Dataset<Row> splitDataSet=wordCountsDataFrame.withColumn("rating1", split(col("word"), ",").getItem(0))
                    		.withColumn("rating2", split(col("word"), ",").getItem(1))
                    		.withColumn("rating3", split(col("word"), ",").getItem(2))
                    		.withColumn("rating4", split(col("word"), ",").getItem(0));
                    
                    Dataset<Row> splitDataSet1 = splitDataSet.drop("word");
                    splitDataSet1.show();
 
                    splitDataSet1.write()
                    .format("org.elasticsearch.spark.sql")
                    .option("es.nodes.wan.only","true")
                    . option("es.nodes","localhost:9200")
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
         });
         
         

         jssc.start();
         jssc.awaitTermination();
	}

	}
