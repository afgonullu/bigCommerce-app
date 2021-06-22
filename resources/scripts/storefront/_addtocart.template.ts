export const addToCart = `<!-- TikTok Pixel Code Start: Product Detail Page Add to Cart Event -->
<script>
document.querySelectorAll('[data-cart-item-add]').forEach(form => form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  let productId, productQty;
  for (const pair of formData.entries()) {
    if (pair[0] === 'product_id') {
      productId = pair[1];
    } else if (pair[0] === 'qty[]') {
      productQty = pair[1];
    }
  }
  
  ttq.instance('<%= property_id %>').track('AddToCart', {
    content_id: productId,
    content_type: 'product_group',
    quantity: productQty,
  });
}));
</script>
<!-- TikTok Pixel Code End: Product Detail Page Add to Cart Event -->`;
