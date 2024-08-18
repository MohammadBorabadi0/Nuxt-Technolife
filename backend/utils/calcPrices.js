export const calculateOrderPrices = (orderItems) => {
  return orderItems.reduce(
    (acc, item) => {
      const discountAmount =
        ((item.price * item.discount || 0) / 100) * item.quantity;
      const shippingCost = item.quantity * 28000;

      acc.totalPrices += item.price * item.quantity;
      acc.totalPricesAfterDiscount +=
        (item.price - discountAmount) * item.quantity;
      acc.totalDiscountAmount += discountAmount;
      acc.shippingCost += shippingCost;

      return acc;
    },
    {
      totalPrices: 0,
      totalPricesAfterDiscount: 0,
      totalDiscountAmount: 0,
      shippingCost: 0,
    }
  );
};
