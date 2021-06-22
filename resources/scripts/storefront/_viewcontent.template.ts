export const viewContent = `<!-- TikTok Pixel Code Start: View Product Content -->
<script>
{{#if product.id}}
  ttq.instance('<%= property_id %>').track('ViewContent', {
    "content_id": "{{product.id}}",
    "content_name": "{{product.title}}",
    "content_type": "product_group",
    {{#if product.price.without_tax}}
    "currency": "{{product.price.without_tax.currency}}",
    "price": {{product.price.without_tax.value}},
    "value": {{product.price.without_tax.value}},
    {{/if}}
  });
{{/if}}
</script>
<!-- TikTok Pixel Code End: View Product Content -->`;
