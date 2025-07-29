package com.example.controller;

import com.example.mapper.OrderDtoMapper;
import com.example.model.input.OrderInputDto;
import com.example.model.output.OrderOutputDto;
import com.example.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.OrderApi;
import org.openapitools.model.FastOrdersResponse;
import org.openapitools.model.OrderRequest;
import org.openapitools.model.OrderResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class OrderController implements OrderApi {

  private final OrderService orderService;
  private final OrderDtoMapper orderDtoMapper;

  @Override
  public ResponseEntity<OrderResponse> createOrder(String userId, OrderRequest orderRequest) {
    OrderInputDto orderInputDto = orderDtoMapper.mapToInputDto(orderRequest);
    OrderOutputDto orderOutputDto = orderService.createOrder(orderInputDto, userId);

    OrderResponse orderResponse = orderDtoMapper.mapToOutputDto(orderOutputDto);

    return ResponseEntity.ok(orderResponse);
  }

  @Override
  public ResponseEntity<Void> deleteOrder(String userId) {
    return null;
  }

  @Override
  public ResponseEntity<FastOrdersResponse> getFastOrders(String userId) {
    return null;
  }

  @Override
  public ResponseEntity<List<OrderResponse>> getOrder(String userId) {
    return null;
  }
}
