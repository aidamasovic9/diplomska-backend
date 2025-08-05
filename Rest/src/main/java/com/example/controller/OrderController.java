package com.example.controller;

import com.example.mapper.OrderDtoMapper;
import com.example.model.input.OrderInputDto;
import com.example.model.output.FastOrderObjectOutputDto;
import com.example.model.output.OrderOutputDto;
import com.example.service.FastOrderService;
import com.example.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.openapitools.api.OrderApi;
import org.openapitools.model.FastOrderObject;
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
  private final FastOrderService fastOrderService;
  private final OrderDtoMapper orderDtoMapper;

  @Override
  public ResponseEntity<FastOrderObject> createFastOrder(String userId, OrderRequest orderRequest) {
    OrderInputDto orderInputDto = orderDtoMapper.mapToInputDto(orderRequest);
    FastOrderObjectOutputDto fastOrder = fastOrderService.createFastOrder(orderInputDto, userId);
    FastOrderObject fastOrderObject = orderDtoMapper.mapToFastOrderObject(fastOrder);

    return ResponseEntity.ok(fastOrderObject);
  }

  @Override
  public ResponseEntity<OrderResponse> createOrder(String userId, OrderRequest orderRequest) {
    OrderInputDto orderInputDto = orderDtoMapper.mapToInputDto(orderRequest);
    OrderOutputDto orderOutputDto = orderService.createOrder(orderInputDto, userId);

    OrderResponse orderResponse = orderDtoMapper.mapToOutputDto(orderOutputDto);

    return ResponseEntity.ok(orderResponse);
  }

  @Override
  public ResponseEntity<Void> deleteFastOrder(String userId, String itemId) {
    orderService.deleteFastOrder(userId, itemId);

    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<Void> deleteOrder(String orderId) {
    orderService.deleteOrder(orderId);

    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<FastOrdersResponse> getFastOrders(String userId) {
    List<FastOrderObjectOutputDto> fastOrders = fastOrderService.getFastOrders(userId);

    List<FastOrderObject> fastOrderObjects = orderDtoMapper.mapToFastOrderObjects(fastOrders);
    FastOrdersResponse fastOrdersResponse = new FastOrdersResponse();
    fastOrdersResponse.setOrders(fastOrderObjects);

    return ResponseEntity.ok(fastOrdersResponse);
  }

  @Override
  public ResponseEntity<OrderResponse> getOrder(String userId) {
    OrderOutputDto order = orderService.getOrder(userId);
    OrderResponse orderResponse = orderDtoMapper.mapToOutputDto(order);

    return ResponseEntity.ok(orderResponse);
  }
}
