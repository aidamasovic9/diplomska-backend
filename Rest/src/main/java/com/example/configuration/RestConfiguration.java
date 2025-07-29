package com.example.configuration;

import com.example.RestComponentScanMarker;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackageClasses = RestComponentScanMarker.class)
public class RestConfiguration {
}
