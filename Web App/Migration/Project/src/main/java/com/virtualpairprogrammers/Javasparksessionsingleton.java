package com.virtualpairprogrammers;

import org.apache.spark.SparkConf;
import org.apache.spark.sql.SparkSession;
import org.elasticsearch.hadoop.cfg.ConfigurationOptions;

class Javasparksessionsingleton {
	  private static transient SparkSession instance = null;
	  public static SparkSession getInstance(SparkConf sparkConf) {
	    if (instance == null) {
	      instance = SparkSession
	        .builder()
	        .config(sparkConf)
            .config(ConfigurationOptions.ES_NET_HTTP_AUTH_USER, "elastic")
            .config(ConfigurationOptions.ES_NET_HTTP_AUTH_PASS, "n0kdN3sCnq3Vey1R8wfMWeU0")
            .config(ConfigurationOptions.ES_NODES, "https://elastic:n0kdN3sCnq3Vey1R8wfMWeU0@17672b44a83a4910b086a10722b707c6.eastus2.azure.elastic-cloud.com/")
            .config(ConfigurationOptions.ES_PORT, "9243")
            .appName("Read JSON File to DataSet")
            //.config("spark.mongodb.output.uri", mongodbUri)
            .getOrCreate();
	    }
	    return instance;
	  }
	}