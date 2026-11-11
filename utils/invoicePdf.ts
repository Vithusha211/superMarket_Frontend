import * as Print from 'expo-print';

export type InvoicePdfItem = {
  name: string;
  quantityLabel: string;
  qty: number;
  price: number;
};

export type InvoicePdfData = {
  orderDate: string;
  orderTime: string;
  customerName: string;
  orderType: string;
  deliveryLocation: string;
  items: InvoicePdfItem[];
  subtotal: number;
  labels: {
    title: string;
    orderDate: string;
    orderTime: string;
    customerName: string;
    orderType: string;
    deliveryLocation: string;
    item: string;
    quantity: string;
    price: string;
    total: string;
    subtotal: string;
  };
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

export function createInvoiceHtml(invoice: InvoicePdfData) {
  const rows = [
    [invoice.labels.orderDate, invoice.orderDate],
    [invoice.labels.orderTime, invoice.orderTime],
    [invoice.labels.customerName, invoice.customerName],
    [invoice.labels.orderType, invoice.orderType],
    [invoice.labels.deliveryLocation, invoice.deliveryLocation],
  ]
    .map(
      ([label, value]) =>
        `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`,
    )
    .join('');
  const items = invoice.items
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.name)}<br><small>${escapeHtml(item.quantityLabel)}</small></td>
        <td>${item.qty}</td>
        <td>$ ${item.price.toFixed(2)}</td>
        <td>$ ${(item.price * item.qty).toFixed(2)}</td>
      </tr>`,
    )
    .join('');
  const html = `<!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: Arial, sans-serif; color: #111827; padding: 32px; }
          h1 { color: #07C187; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border-bottom: 1px solid #E5E7EB; padding: 12px 8px; text-align: left; }
          th { color: #6B7280; font-weight: 500; width: 35%; }
          small { color: #6B7280; }
          .items th { width: auto; }
          .total { text-align: right; font-size: 18px; font-weight: 700; margin-top: 24px; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(invoice.labels.title)}</h1>
        <table>${rows}</table>
        <table class="items">
          <thead><tr><th>${escapeHtml(invoice.labels.item)}</th><th>${escapeHtml(invoice.labels.quantity)}</th><th>${escapeHtml(invoice.labels.price)}</th><th>${escapeHtml(invoice.labels.total)}</th></tr></thead>
          <tbody>${items}</tbody>
        </table>
        <p class="total">${escapeHtml(invoice.labels.subtotal)}: $ ${invoice.subtotal.toFixed(2)}</p>
      </body>
    </html>`;

  return html;
}

export async function createInvoicePdf(invoice: InvoicePdfData) {
  return Print.printToFileAsync({
    html: createInvoiceHtml(invoice),
    base64: true,
  });
}
