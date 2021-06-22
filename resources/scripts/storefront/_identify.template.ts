export const identify = `<!-- TikTok Pixel Code Start: Advanced Matching -->
<script>
{{#if customer.id}}
ttq.identify('{{customer.id}}', {
  email: '{{customer.email}}',
  {{#if customer.phone}}
  phone_number: '{{customer.phone}}',
  {{/if}}
})
{{/if}}
</script>
<!-- TikTok Pixel Code End: Advanced Matching -->`;
