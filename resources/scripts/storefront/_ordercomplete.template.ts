export const orderComplete = `<!-- TikTok Pixel Code Start: Purchase Event -->
<script>
fetch('/api/storefront/order/{{checkout.order.id}}', {
  credentials: 'same-origin'
})
.then(function(response) {
  return response.json();
})
.then(function(orderJson) {
  var orderQty = 0;
	var lineItems = [];

	for (i = 0; i < orderJson.lineItems.physicalItems.length; i++) {
    var thisItem = orderJson.lineItems.physicalItems[i];
    orderQty += thisItem.quantity;
    lineItems.push({
      "content_id": thisItem.productId,
      "content_name": thisItem.name,
      "currency": orderJson.currency.code,
      "price": thisItem.salePrice,
      "value": thisItem.extendedSalePrice,
      "quantity": thisItem.quantity,
      "content_type": "product_group"
    });
	}

	for (i = 0; i < orderJson.lineItems.digitalItems.length; i++) {
    var thisItem = orderJson.lineItems.digitalItems[i];
    orderQty += thisItem.quantity;
    lineItems.push({
      "content_id": thisItem.productId,
      "content_name": thisItem.name,
      "currency": orderJson.currency.code,
      "price": thisItem.salePrice,
      "value": thisItem.extendedSalePrice,
      "quantity": thisItem.quantity,
      "content_type": "product_group"
    });
	}

	for (i = 0; i < orderJson.lineItems.giftCertificates.length; i++) {
    var thisItem = orderJson.lineItems.giftCertificates[i];
    orderQty += thisItem.quantity;
    lineItems.push({
      "content_id": thisItem.type,
      "content_name": thisItem.name,
      "currency": orderJson.currency.code,
      "price": thisItem.amount,
      "value": thisItem.amount,
      "quantity": thisItem.quantity,
      "content_type": "product_group"
    });
	}

  ttq.instance('<%= property_id %>').track('Purchase', {
      "contents": lineItems,
      "value": orderJson.orderAmount,
      "quantity": orderQty,
      "currency": orderJson.currency.code
  });
});
</script>
<!-- TikTok Pixel Code End: Purchase Event -->`;
